<template>
  <div>

    <Navbar/>
    
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="exercise in exercises" :key="exercise.id">
          <ExerciseCard :maxWidth="250" :exercise="exercise" class="mt-4"/>
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages"></v-pagination>
    </v-container>

    <AddExercise/>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar';
  import ExerciseCard from '../components/ExerciseCard';
  import AddExercise from '../views/AddExercise'
  import mockExercices from '../mock_data/exercices';

  export default {
      components: { Navbar, ExerciseCard, AddExercise },
      computed: {
        exercises: function(){
          return mockExercices.slice(this.currPage*8 - 8,this.currPage*8);
        },
        amountOfPages: function(){
          return Math.floor(mockExercices.length / 8) + 1;
        }
      },
      data: ()=>({
        currPage: 1
      })
  }
  </script>