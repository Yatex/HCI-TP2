<template>
  <div>

    <Navbar/>

    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="routine in routines" :key="routine.id">
          
          <ActivityCardEditable :maxWidth="250" class="mt-4"
            :data="routine" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages"></v-pagination>
    </v-container>
    
    <!-- <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="routine in routines.results" :key="routine.id">
          
          <ActivityCardEditable :maxWidth="250" class="mt-4"
            :data="{title:routine.name,desc:routine.detail}" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="changePage"></v-pagination>
    </v-container> -->

    <AddRoutine/>

  </div>
</template>

<script>
  import AddRoutine from './AddRoutine'
  import RoutineDetail from './RoutineDetail';
  import Navbar from '../../components/Navbar';
  import ActivityCardEditable from '../../components/ActivityCardEditable';
  import mockRoutines from '../../mock_data/routines';

  export default {
    components: { Navbar, ActivityCardEditable, AddRoutine },
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


  // import { RoutineApi/*,Routine,Routines*/ } from '../../api/routines.js';

  // export default {
  //     components: { Navbar, ActivityCardEditable, AddRoutine },
  //     methods:{
  //       changePage(){
  //         return RoutineApi.getAll(null,"rookie",this.currPage-1);
  //       }
  //     },
  //     computed: {
  //       routines: function(){
  //         return RoutineApi.getAll(null,"rookie",this.currPage-1);
  //       },
  //       amountOfPages: function(){
  //         return Math.floor(this.routines.totalCount / this.routines.size) + 1;
  //       }
  //   },
  //   data: ()=>({
  //     currPage: 1,
  //     detailComponent: RoutineDetail
  //   })
  // } 
</script>