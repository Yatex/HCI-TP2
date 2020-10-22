<template>
  <div>

    <Navbar/>

    <v-container v-if="Routines.totalCount > 0">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="Routine in Routines.results" :key="Routine.id">
          
          <ActivityCardEditable :maxWidth="250" class="mt-4"
            :data="{title:Routine.name,desc:Routine.detail}" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="changePage" ></v-pagination>
    </v-container>
    
    <div v-else>
      Here you can add the cycles for the routine
    </div>

    <AddRoutine/>

  </div>
</template>

<script>
  import AddRoutine from './AddRoutine'
  import MyRoutineDetailEditable from './MyRoutineDetailEditable';
  import Navbar from '../../components/Navbar';
  import ActivityCardEditable from '../../components/ActivityCardEditable';

  //import { RoutineApi } from '../../api/routines.js';
  import { UserApi } from '../../api/user.js';

  export default {
     
      components: { Navbar, ActivityCardEditable, AddRoutine},
      methods:{
        changePage(){
          UserApi.getAllRoutines(null,this.currPage-1,8).then(data=>{this.Routines=data;});
        },
        fillRoutines(){
          UserApi.getAllRoutines(null,this.currPage-1,8).then(data=>{
            this.Routines=data;
            this.amountOfPages=Math.floor(this.Routines.totalCount / this.Routines.size) + 1;}
            );
        }      
      }, 
    data: ()=>({
      currPage: 1,
      detailComponent: MyRoutineDetailEditable,
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