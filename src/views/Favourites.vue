<template>
  <div class="Favourites">

    <Navbar/>
    
    <v-container>

      <v-expansion-panels>

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

        <v-expansion-panel>
          <v-expansion-panel-header>
            Routines
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-col v-for="routine in routines" :key="routine.id">
                <ActivityCard :maxWidth="250" :data="routine" :detailComponent="routineDetailComponent"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-container>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar';
  import ActivityCard from '../components/ActivityCard';
  import ExerciseDetail from './exercises/ExerciseDetail';
  import RoutineDetail from './routines/RoutineDetail';
  import mockExercises from '../mock_data/exercices';
  import mockRoutines from '../mock_data/routines';

  export default {
      data: () => ({
        exercises: mockExercises,
        routines: mockRoutines,
        exerciseDetailComponent: ExerciseDetail,
        routineDetailComponent: RoutineDetail
      }),
      components: { Navbar, ActivityCard },
  }
</script>