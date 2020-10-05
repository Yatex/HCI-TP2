<template>
  <div class="Exercises">

    <Navbar/>

    <v-container fluid>
      <v-row>
        <v-col v-for="exercise in exercises" :key="exercise.id">
          <ExerciseCard :maxWidth="250" :exercise="exercise"/>
        </v-col>
      </v-row>
    </v-container>

    <v-pagination v-model="currPage" :length="2"></v-pagination>

    <v-btn elevation="2" color="accent" fab fixed right bottom>
      <v-icon color="primary">mdi-plus</v-icon>
    </v-btn>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar';
  import ExerciseCard from '../components/ExerciseCard';
  import mockExercices from '../mock_data/exercices'

  export default {
      components: { Navbar, ExerciseCard },
      computed: {
        exercises: function(){
          if(this.currPage == 1){
            return mockExercices;
          }else{
            return mockExercices.slice(3,6);
          }
        }
      },
      data: ()=>({
        currPage: 1
      })
  }
  </script>