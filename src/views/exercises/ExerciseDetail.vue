<template>
  <v-dialog v-model="dialog" max-width="600px">
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img :src="img" height="200px"/>

      <v-card-title>{{exercise.name}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{exercise.type.capitalize()}}
        </div>

        <div class="my-2">
          {{exercise.detail}}
        </div>

        <div class="my-2">
          <v-icon>mdi-timer-outline</v-icon> {{exercise.duration}} secs
        </div>

        <div class="my-2">
         <v-icon>repeat</v-icon> {{exercise.repetitions}} times
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn v-if="own" color="accent darken-3" @click="showAddExerciseDialog=true" text>
          Edit Excercise
        </v-btn>
      </v-card-actions>
    </v-card>

    <EditExercise :dialog="showAddExerciseDialog" :data="exercise"
        @save="updateExercise($event)" @cancel="showAddExerciseDialog=false"/>

  </v-dialog>
</template>


<script>
    import Vue from 'vue';
    import EditExercise from './EditExercise';

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }

    export default {
      props: ['data', 'own', 'dialog'],

      data: function(){
        return {
          showAddExerciseDialog: false,
          img: require('../../assets/gym2.jpg'),
          exercise: Vue.util.extend({}, this.data),
        }
      },

      methods: {
        updateExercise(exercise){
          this.showAddExerciseDialog = false;
          this.exercise = exercise;
          this.$emit('update', exercise);
        }
      },

      components: { 
        EditExercise,
      }
    }
</script>