<template>
  <div>

    <Navbar/>

    <v-container v-if="Routines.totalCount > 0">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="Routine in Routines.results" :key="Routine.id">
          
          <ActivityCard :maxWidth="250" class="mt-4" :editable="$route.params.of == 'own'"
            :data="Routine" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="changePage" ></v-pagination>
    </v-container>
    
    <div v-else>
      Here you can see all your routines
    </div>

    <AddRoutine/>

  </div>
</template>

<script>
  import AddRoutine from './AddRoutine'
  import RoutineDetail from './RoutineDetail';
  import Navbar from '../../components/Navbar';
  import ActivityCard from '../../components/ActivityCard';

  import { RoutineApi } from '../../api/routines.js';
  import { UserApi } from '../../api/user.js';

  export default {    
    methods:{
      async changePage(){
        if(this.$route.params.of == "own")
          this.Routines = await UserApi.getAllRoutines(null,this.currPage-1,8); 
        else
          this.Routines = await RoutineApi.getAll(this.currPage-1, 8);
      },
      async fillRoutines(){
        if(this.$route.params.of == "own"){
          this.Routines = await UserApi.getAllRoutines(null,this.currPage-1,8); 
        }else{
          this.Routines = await RoutineApi.getAll(this.currPage-1, 8);      
        }
        this.amountOfPages=Math.floor(this.Routines.totalCount / this.Routines.size) + 1;
      }
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
    },

    components: { Navbar, ActivityCard, AddRoutine},
  } 
</script>