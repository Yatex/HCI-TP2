<template>
  <v-dialog :value="dialog" @input="$emit('close')" max-width="600px">
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="img"/>

      <v-card-title>{{routine.name}}</v-card-title>

      <v-card-subtitle>Designed for {{routine.difficulty}}</v-card-subtitle>

      <v-card-text>
        {{routine.detail}}
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="grey--text text--darken-3">Cycles</v-card-title>

      <v-card-text>
        <v-expansion-panels>

          <v-expansion-panel v-for="cycle in cycles" :key="cycle.id" @change="getExercises(cycle.id)">
            <v-expansion-panel-header>
              {{cycle.name}}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              
              <v-card-text>
                <div class="mb-4">
                  <v-icon>mdi-information-outline</v-icon> {{cycle.detail}}
                </div>

                <div class="my-4">
                  <v-icon>repeat</v-icon> {{cycle.repetitions}} times
                </div>

              </v-card-text>

              <v-divider/>

              <div v-if="loadingExercises">
                <v-progress-circular indeterminate/>
              </div>
              
              <div v-else>
                <v-card-title>Exercises</v-card-title>

                <v-card-text>
                  <v-col v-for="exercise in exercises" :key="exercise.id">          
                    <v-row>

                      Do {{exercise.name}} for {{exercise.duration}} secs, repeat {{exercise.repetitions}} times
                      
                      <v-spacer/>
                      
                      <v-btn icon @click="showExerciseDetail=true">
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>

                      <ExerciseDetail :data="exercise" :own="own" :dialog="showExerciseDetail"
                        @close="showExerciseDetail=false" @update="updateExercise($event)"
                          @delete="deleteExercise($event)"/>

                    </v-row>
                  </v-col>
                </v-card-text>
              </div>

            </v-expansion-panel-content>
            
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="mt-4"> 
        <v-dialog v-model="showDeleteDialog" max-width="290" >
          <v-card>
            <v-card-title class="headline">
              Delete {{ routine.name }}
            </v-card-title>
    
            <v-card-text>
              This can not be undone! Continue?
            </v-card-text>
    
            <v-card-actions>
              <v-btn color="red darken-1" text @click="deleteRoutine()" >
                Yes, delete
              </v-btn>
              <v-spacer />
              <v-btn color="grey lighten-1" text @click="showDeleteDialog=false" >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="red darken-1" @click="showDeleteDialog=true" v-if="own" text>
          Delete
        </v-btn>

        <v-spacer/>

        <v-btn color="accent darken-3"  @click="showEditDialog=true" v-if="own" text>
          Edit Routine
        </v-btn>
      </v-card-actions>

    </v-card>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
    </v-snackbar>

  </v-dialog>
</template>


<script>
  import Vue from 'vue';
  import { RoutineApi } from '../../api/routines.js';

  import ExerciseDetail from '../exercises/ExerciseDetail';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default {
    props: ['data', 'own', 'dialog'],

    data: function(){
      return {
        routine: Vue.util.extend({}, this.data),

        showEditDialog: false,
        showDeleteDialog: false,
        showExerciseDetail: false,
        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',

        loadingExercises: false,
        exercises: [],
        
        img: require('../../assets/gym.jpg'),
      }
    },

    methods: {
      updateRoutine(routine){
        this.showEditDialog = false;
        this.routine = routine;
        this.$emit('update', routine);
      },

      async deleteRoutine(){
        this.showDeleteDialog = false;
        this.showOverlay = true;

        try{
          this.showOverlay = true;
          
          await RoutineApi.delete(this.routine.id);

          this.showOverlay = false;
          this.$emit('delete', this.routine);
        }catch(e){
            this.showOverlay = false;
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong'; 
            console.log(e);
        }
      },

      async getExercises(cycleId){
        this.loadingExercises = true;
        let exercises = await RoutineApi.getExercises(this.routine.id, cycleId);

        for(let i=0; i<exercises.length; i++){
          exercises[i].routineId = this.routine.id;
          exercises[i].cycleId = cycleId;
        }

        this.exercises = exercises;
        this.loadingExercises = false;
      },

      async updateExercise(exercise){
        console.log('Updating');
        console.log(exercise);
        for(let i=0; i<this.exercises.length; i++)
          if(this.exercises[i].id == exercise.id)
            this.exercises[i] = exercise;
      },

      async deleteExercise(exercise){
        this.exercises = this.exercises.filter(e => e.id != exercise.id);
      },

      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    asyncComputed: {
      async cycles(){
        return await RoutineApi.getCycles(this.routine.id);
      }
    },

    components: {ExerciseDetail}
  }
</script>