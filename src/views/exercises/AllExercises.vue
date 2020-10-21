<template>
  <div>

    <Navbar/>
    
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="exercise in exercises" :key="exercise.id">

          <ActivityCard :maxWidth="250" class="mt-4"
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
  import mockExercices from '../../mock_data/exercices';

  export default {
      components: { Navbar, ActivityCard},
      computed: {
        exercises: function(){
          return mockExercices.slice(this.currPage*8 - 8,this.currPage*8);
        },
        amountOfPages: function(){
          return Math.floor(mockExercices.length / 8) + 1;
        }
      },
      data: ()=>({
        currPage: 1,
        detailComponent: ExerciseDetail
      })
  }
  </script>