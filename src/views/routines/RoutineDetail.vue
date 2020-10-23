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

      <v-card-title>{{data.name}}</v-card-title>

      <v-card-text>
        <div>
          {{data.detail}}
        </div>
        <div>
          Difficulty: {{data.difficulty.capitalize()}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="grey--text text--darken-3">Cycles</v-card-title>

      <v-card-text>
        <v-expansion-panels>

          <v-expansion-panel v-for="cycle in cycles" :key="cycle.id">
            <v-expansion-panel-header>
              {{cycle.name}}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <PromiseBuilder v-slot="snapshot" :promise="getExercises(cycle.id)">
                <div v-if="snapshot.isPending">
                  <v-progress-circular indeterminate/>
                </div>
                <div v-else-if="snapshot.isSettled">
                  
                  <v-col v-for="exercise in snapshot.result" :key="exercise.id">
                    {{exercise.name}} - {{exercise.duration}}
                  </v-col>
                </div>
              </PromiseBuilder>
            </v-expansion-panel-content>
            
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="mt-4"> 
        <v-dialog v-model="deleteDialog" max-width="290" >
          <v-card>
            <v-card-title class="headline">
              Delete {{ data.name }}
            </v-card-title>
    
            <v-card-text>
              This can not be undone! Continue?
            </v-card-text>
    
            <v-card-actions>
              <v-btn color="red darken-1" text @click="deleteRoutine()" >
                Yes, delete
              </v-btn>
              <v-spacer />
              <v-btn color="grey lighten-1" text @click="deleteDialog=false" >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="red darken-1" @click.stop="deleteDialog=true" v-if="own" text>
          Delete
        </v-btn>

        <v-spacer/>

        <v-btn color="accent darken-3" text>
          Add to Favourites
        </v-btn>

        <v-btn color="accent darken-3" v-if="own" text>
          Edit Routine
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>


<script>
  import { RoutineApi } from '../../api/routines.js';
  import { PromiseBuilder } from 'vue-promise-builder';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default {
    props: ['dialog', 'data', 'own'],

    data: () => ({
      img: require('../../assets/gym.jpg'),
      deleteDialog: false
    }),

    methods: {
      async getExercises(id){
        return await RoutineApi.getExercises(this.data.id, id);
      },
      deleteRoutine(){
        RoutineApi.delete(this.data.id);
        this.deleteDialog = false;
      }
    },

    asyncComputed: {
      async cycles(){
        return await RoutineApi.getCycles(this.data.id);
      }
    },

    components: {PromiseBuilder}
  }
</script>