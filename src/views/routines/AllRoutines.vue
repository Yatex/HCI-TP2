<template>
  <div>

    <Navbar/>

  

    <v-container>
      <v-row class="mb-6" no-gutters>
        <v-col v-for="Routine in Routines.result" :key="Routine.id">
          
          <ActivityCardEditable :maxWidth="250" class="mt-4"
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
  import ActivityCardEditable from '../../components/ActivityCardEditable';


  



  import { RoutineApi } from '../../api/routines.js';

  export default {
     
      components: { Navbar, ActivityCardEditable },
      methods:{
        changePage(){
          RoutineApi.getAll(null,this.currPage-1,8).then(data=>{this.Routines=data.results;});
        },
        fillRoutines(){
          RoutineApi.getAll(null,this.currPage-1,8).then(data=>{this.Routines=data.results;});
        },
        amountOfPagesFunc(){
          this.amountOfPages=Math.floor(this.Routines.totalCount / this.Routines.size) + 1;
        }
        
      }, 
      computed: {
        
    },
    data: ()=>({
      currPage: 1,
      detailComponent: RoutineDetail,
      Routines:{},
      amountOfPages:undefined 
    }),
     created(){
        this.fillRoutines();
        this.amountOfPagesFunc();
      }
  } 
</script>