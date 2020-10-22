<template>
  <v-dialog max-width="600px">

    <template v-slot:activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="data.img"></v-img>

      <v-card-title>{{data.title}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{data.difficulty}}
        </div>

        <div class="my-2">
          {{data.desc}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Exercises</v-card-title>

      <!-- <v-card-text v-for="exercise in data.exercises" :key="exercise.id">
        {{getExercise(exercise.id).title}} - {{exercise.duration}}
      </v-card-text> -->

      <v-expansion-panels>
        <v-expansion-panel v-for="cycle in Cycle.results" :key="cycle.id">
          <v-expansion-panel-header>{{cycle.name}}</v-expansion-panel-header>
          <v-expansion-panel-content @click="getExercise(cycle.id)">
            <v-row >
              <v-col v-for="exercise in Exercise.results" :key="exercise.id">
                <!-- <ActivityCardEditable :maxWidth="250" :data="exercise" :detailComponent="detailComponent"/> reemplayar esto por algo lindo de ver-->
                {{exercise.name}}
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-card-actions>
        <v-btn color="accent darken-3" text>
          Add to Favourites
        </v-btn>
        <v-btn color="accent darken-3" text>
          Edit Excercise
        </v-btn>
      </v-card-actions>
      
    </v-card>

  </v-dialog>
</template>

 
<script>
    //import AddRoutine from './AddRoutine'
    //import Navbar from '../../components/Navbar';
    //import ActivityCardEditable from '../../components/ActivityCardEditable';
    import ExerciseDetail from '../exercises/ExerciseDetail'
    import { RoutineApi } from '../../api/routines.js';
    import { CycleApi } from '../../api/cycles.js';
    import { ExerciseApi } from '../../api/exercises.js';

    export default {
      props: ['data','id'],
      //components: { ActivityCardEditable},
      methods:{
      
        getExercise(cycle_id) { //esta dejuelve los ejercicios en si, ojo que depende de routine.id y de cycle.id
        ExerciseApi.getAllExercises(this.id,cycle_id,null,0,10).then(data=>{
        this.Exercise=data;})
        }      
      },
      asyncComputed: {
     async Routine() { //te da la info de la rutina(dificultad nombre esas cosas)
      return await RoutineApi.get(this.id,null);
    },
     Cycle:async function() {
      return await CycleApi.getAllCycles(this.id,null,0,10); // te devuelve una lista de los cycles y algunas cositas mas
    },
    // async Exercise(cyc){
    //   return await CycleApi.getAllExercises(this.id,cycle_id,null,0,10);
    // }
    
  }, 
    data: ()=>({
      currPage: 1,  
      detailComponent: ExerciseDetail,
  
    
      Exercise:{
        totalCount: undefined,
        orderBy: '',
        direction: '',
        results: ["test3","test4"],
        size: undefined,
        page: undefined,
        isLastPage: true
      },
    }),
     
    }
</script>