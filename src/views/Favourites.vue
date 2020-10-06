<template>
  <div class="Favourites">

    <Navbar/>
    
    <v-container>

      <v-card class="mt-8">
        <v-card-title>Exercises:</v-card-title>
        <v-row >
          <v-flex v-for="exercise in exercises" :key="exercise.id">
            <ExerciseCard :maxWidth="250" :exercise="exercise"/>
          </v-flex>
        </v-row>
      </v-card>

      <v-card class="mt-8 mb-8">
        <v-card-title>Routines:</v-card-title>  
        <v-layout row wrap>
          <v-flex v-for="routine in routines" :key="routine.id">
            <ExerciseCard :maxWidth="250" :exercise="routine"/>
          </v-flex>
        </v-layout>
      </v-card>

    </v-container>
    
    <Footer/>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer';
  import ExerciseCard from '../components/ExerciseCard';
  import mockExercises from '../mock_data/exercices';
  import mockRoutines from '../mock_data/routines';

  export default {
      data: () => ({
        exercises: mockExercises,
        routines: mockRoutines,
      }),
      components: { Navbar, Footer, ExerciseCard },
  }
</script>