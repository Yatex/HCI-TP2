<template>
  <div>

    <Navbar/>

  

    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="Routine in Routines.results" :key="Routine.id">
          
          <ActivityCard :maxWidth="250" class="mt-4"
            :data="{title:Routine.name,desc:Routine.detail}" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="changePage" ></v-pagination>
    </v-container>
    

  </div>
</template>

<script>
  
  import RoutineDetail from './RoutineDetail';
  import Navbar from '../../components/Navbar';
  import ActivityCard from '../../components/ActivityCard';


  



  import { RoutineApi } from '../../api/routines.js';

  export default {
     
      components: { Navbar, ActivityCard },
      methods:{
        changePage(){
          RoutineApi.getAll(null,this.currPage-1,8).then(data=>{this.Routines=data;});
        },
        fillRoutines(){
          RoutineApi.getAll(null,this.currPage-1,8).then(data=>{
            this.Routines=data;
            this.amountOfPages=Math.floor(this.Routines.totalCount / this.Routines.size) + 1;}
          );
        },
        
      }, 
      computed: {
        
    },
    data: ()=>({
      currPage: 1,
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
     created(){
        this.fillRoutines();
      }
  } 
</script>