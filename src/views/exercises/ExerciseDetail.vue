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
      <div v-if="exercise.imgUrl!=undefined"> 
        <v-img :src="exercise.imgUrl" height="200px"/>
      </div>
      <div v-else>
        <v-img :src="img" height="200px"/>
      </div>
      
      <v-card-title>{{exercise.name}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{capitalize(exercise.type)}}
        </div>

        <div class="my-4">
          <v-icon>mdi-information-outline</v-icon> {{exercise.detail}}
        </div>

        <div class="my-4">
          <v-icon>mdi-timer-outline</v-icon> {{exercise.duration}} secs
        </div>

        <div class="my-4">
         <v-icon>repeat</v-icon> {{exercise.repetitions}} times
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-dialog v-model="showDeleteDialog" max-width="290" >
          <v-card>
              <v-card-title class="headline">
              Delete {{ data.name }}
              </v-card-title>
      
              <v-card-text>
              This can not be undone! Continue?
              </v-card-text>
      
              <v-card-actions>
              <v-btn color="red darken-1" text @click="deleteExercise()" >
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
        
        <v-btn color="accent darken-3" @click="showEditDialog=true" v-if="own" text>
          Edit Excercise
        </v-btn>

      </v-card-actions>
    </v-card>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
    </v-snackbar>

    <EditExercise :dialog="showEditDialog" :data="exercise"
        @save="updateExercise($event)" @cancel="showEditDialog=false"/>

  </v-dialog>
</template>


<script>
  import Vue from 'vue';
  import { RoutineApi } from '../../api/routines';

  import EditExercise from './EditExercise';

  export default {
    props: ['data', 'own', 'dialog'],

    data: function(){
      return {
        exercise: Vue.util.extend({}, this.data),

        showEditDialog: false,
        showDeleteDialog: false,
        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',
        
        img: require('../../assets/gym2.jpg'),
      }
    },

    methods: {
      updateExercise(exercise){
        this.showEditDialog = false;
        this.exercise = exercise;
        this.$emit('update', exercise);
      },

      async deleteExercise(){
        this.showDeleteDialog = false;
        this.showOverlay = true;

        try{
          this.showOverlay = true;
          
          await RoutineApi.deleteExercise(this.exercise.routineId, this.exercise.cycleId, this.exercise.id);

          this.showOverlay = false;
          this.$emit('delete', this.exercise);
        }catch(e){
            this.showOverlay = false;
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong'; 
            console.log(e);
        }
      },

      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    components: { 
      EditExercise,
    }
  }
</script>