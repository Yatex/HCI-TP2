<template>
  <div>

    <Navbar/>
    
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="exercise in exercises" :key="exercise.id">

          <ActivityCard :maxWidth="250" class="mt-4" :own="true"
            :data="exercise" :detailComponent="detailComponent"/>

        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages"></v-pagination>
    </v-container>

  </div>
</template>

<script>
  import ExerciseDetail from './ExerciseDetail';
  import Navbar from '../../components/Navbar';
  import ActivityCard from '../../components/ActivityCard';

  import { RoutineApi } from '../../api/routines.js';
  import { UserApi } from '../../api/user.js';

  export default {
    methods: {
      async test(){
        for(let i=0; i<5; i++){
          await new Promise(r => setTimeout(r, 1000));
          console.log(i);
        }
        console.log('Skipped');
      },
      async getExercises(){

        let ownRoutines = await UserApi.getAllRoutines(null, this.currPage-1, 8);
        for(let routine of ownRoutines.results){

          let routineCycles = await RoutineApi.getCycles(routine.id);
          for(let cycle of routineCycles){

            let cycleExercises = await RoutineApi.getExercises(routine.id, cycle.id);        
            for(let i=0; i<cycleExercises.length; i++){
              cycleExercises[i].routineId = routine.id;
              cycleExercises[i].cycleId = cycle.id;
              this.exercises.push(cycleExercises[i]);
            }

          }

        }
        
        this.amountOfPages = Math.floor(ownRoutines.totalCount / ownRoutines.size) + 1;
      }
    },

    data: ()=>({
      currPage: 1,
      exercises: [],
      amountOfPages: undefined,
      detailComponent: ExerciseDetail
    }),

    created(){
      this.getExercises();
    },

    components: { Navbar, ActivityCard }
  }
  </script>