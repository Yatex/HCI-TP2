<template>
  <div class="Favourites">

    <Navbar/>
    
    <v-container>

        <v-card-title> Exercises: </v-card-title>
        <v-row class="mb-6" no-gutters>
          <v-col v-for="exercise in exercises" :key="exercise.id">
                <ExerciseCard :maxWidth="250" :exercise="exercise" class="mt-6"/>
          </v-col>
        </v-row>

        <v-card-title> Routines: </v-card-title>
        <v-row class="mb-6" no-gutters>
          <v-col v-for="routine in routines" :key="routine.id">
                <ExerciseCard :maxWidth="250" :exercise="routine" class="mt-6"/>
          </v-col>
        </v-row>

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