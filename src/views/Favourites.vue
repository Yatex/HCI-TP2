<template>
  <div class="Favourites">
    <Navbar />
    <v-container>
      <v-card height="300" class="mt-8">
        <v-card-title>Exercises:</v-card-title>
        <v-layout row wrap>
          <v-flex v-for="exercise in exercises" :key="exercise.name">
            <!-- <Prueba /> -->
          </v-flex>
        </v-layout>
      </v-card>
      <v-card height="300" class="mt-8 mb-8">
      <v-card-title>Routines:</v-card-title>  
        <v-layout row wrap>
          <v-flex v-for="routine in routines" :key="routine.name">
            <!--componentes q haga mati van aca -->
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import Exercise from '../components/Exercise';
// import Routine from '../components/Routine';

export default {
    data: () => ({
      exercises: [],
      routines: [],
    }),
    components: {
        Navbar,
        Footer,
    },
}
</script>