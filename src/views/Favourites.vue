<template>
  <div class="Favourites">

    <Navbar/>
    
    <!-- <v-container>

      <v-expansion-panels> -->

        <!-- <v-expansion-panel>
          <v-expansion-panel-header>
            Exercises
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row >
              <v-col v-for="exercise in exercises" :key="exercise.id">
                <ActivityCard
                  :maxWidth="250" :data="exercise" :detailComponent="exerciseDetailComponent"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel> -->

        <!-- <v-expansion-panel>
          <v-expansion-panel-header>
            Routines
          </v-expansion-panel-header> -->

          <v-overlay :value="showOverlay">
            <v-progress-circular indeterminate size="64"/>
          </v-overlay>

          <v-container v-if="Routines.totalCount > 0">
            <v-row class="mb-6" no-gutters>
              <v-col v-for="Routine in Routines.results" :key="Routine.id">
                
                <ActivityCard :maxWidth="250" class="mt-4" :own="isOwn()"
                  :data="Routine" :isRoutine="true" :detailComponent="detailComponent"/>
                
              </v-col>
            </v-row>
            <v-pagination v-model="currPage" :length="amountOfPages" @input="getFavourites"/>
          </v-container>
          
          <div v-else-if="!showOverlay" class="text-h5 mb-6 text-center mt-15">
            <div>
              <h1>There are no routines yet! Favourite some to see them here!</h1>
              <v-row>
                <v-spacer />
                <v-img class="mt-6" :src="img" max-width="500"></v-img>
                <v-spacer />
              </v-row>
            </div>
          </div>


    <!-- </v-container> -->

  </div>
</template>

<script>
  import Navbar from '../components/Navbar';
  import ActivityCard from '../components/ActivityCard';
  import ExerciseDetail from './exercises/ExerciseDetail';
  import RoutineDetail from './routines/RoutineDetail';
  import mockExercises from '../mock_data/exercices';
  import mockRoutines from '../mock_data/routines';
import { UserApi } from '../api/user';

  export default {
      data: () => ({
        exercises: mockExercises,
        routines: mockRoutines,
        exerciseDetailComponent: ExerciseDetail,
        routineDetailComponent: RoutineDetail,
        currPage: 1,
        showOverlay: true,
        img: require('../assets/gym-animated.webp'),
        detailComponent: RoutineDetail,
        Routines:{
          totalCount: undefined,
          orderBy: '',
          direction: '',
          results: [],
          size: undefined,
          page: undefined,
          isLastPage: true
        },
        amountOfPages:undefined 
        }),
      components: { Navbar, ActivityCard },
      methods:{
      async getFavourites(){
        
          this.Routines = await UserApi.getAllFavourites(null,this.currPage-1, 8);      
      
        this.amountOfPages = Math.ceil(this.Routines.totalCount / this.Routines.size);
        this.showOverlay = false;
      },

      isOwn(){
        return this.$route.params.of == "own";
      }
    }, 

    

    created(){
      this.getFavourites();
    },

  
  } 
  
</script>