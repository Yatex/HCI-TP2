<template>
  <div>
    
    <v-overlay :value="showOverlay">
            <v-progress-circular indeterminate size="64"/>
        </v-overlay>

    <v-container v-if="exercises.length > 0">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="exercise in exercises" :key="exercise.id">

          <ActivityCard :maxWidth="250" class="mt-4" :own="true" :isRoutine="false"
            :data="exercise" :detailComponent="detailComponent" @delete="deleteExercise($event)"/>

        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="getExercises"/>
    </v-container>

    <div v-else-if="!showOverlay" class="text-h5 mb-6 text-center mt-15">
      <div>
        <h1>You haven't created exercises yet! Add one in "My Routines"!</h1>
        <v-row>
          <v-spacer />
          <v-img class="mt-6" :src="img" max-width="500"></v-img>
          <v-spacer />
        </v-row>
      </div>
    </div>

  </div>
</template>

<script>
  import ExerciseDetail from './ExerciseDetail';
  import ActivityCard from '../../components/ActivityCard';

  import { RoutineApi } from '../../api/routines.js';
  import { UserApi } from '../../api/user.js';

  export default {
    methods: {
      async deleteExercise(exercise){
        this.exercises = this.exercises.filter(e => e.id != exercise.id);
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
              let imageobj = await RoutineApi.getImage(routine.id, cycle.id,cycleExercises[i].id,null); 
              if(imageobj.totalCount>0){
                cycleExercises[i].imgUrl=imageobj.results[0].url;
                cycleExercises[i].imgId=imageobj.results[0].id;
              }
              imageobj = await RoutineApi.getVideo(routine.id, cycle.id,cycleExercises[i].id,null); 
              if(imageobj.totalCount>0){
                cycleExercises[i].videoUrl=imageobj.results[0].url;
                cycleExercises[i].videoId=imageobj.results[0].id;
              }
              this.exercises.push(cycleExercises[i]);
            }

          }

        }
        
        this.amountOfPages = Math.ceil(ownRoutines.totalCount / ownRoutines.size);
        this.showOverlay = false;
      }
    },

    data: ()=>({
      currPage: 1,
      amountOfPages: undefined,
      exercises: [],
      showOverlay: true,
      
      detailComponent: ExerciseDetail,
      img: require('../../assets/gym-animated.webp')
    }),

    created(){
      this.getExercises();
    },

    components: {ActivityCard}
  }
  </script>