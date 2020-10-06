<template>
  <div>

    <Navbar/>
    
    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="routine in routines" :key="routine.id">
          
          <ActivityCard :maxWidth="250" class="mt-4"
            :data="routine" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages"></v-pagination>
    </v-container>

  </div>
</template>

<script>
  import RoutineDetail from './RoutineDetail';
  import Navbar from '../../components/Navbar';
  import ActivityCard from '../../components/ActivityCard';
  import mockRoutines from '../../mock_data/routines';

  export default {
      components: { Navbar, ActivityCard },
      computed: {
        routines: function(){
          return mockRoutines.slice(this.currPage*8 - 8,this.currPage*8);
        },
        amountOfPages: function(){
          return Math.floor(mockRoutines.length / 8) + 1;
        }
      },
      data: ()=>({
        currPage: 1,
        detailComponent: RoutineDetail
      })
  }
  </script>