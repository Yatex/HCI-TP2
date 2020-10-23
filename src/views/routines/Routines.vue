<template>
  <div>

    <Navbar/>

    <v-container v-if="Routines.totalCount > 0">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="Routine in Routines.results" :key="Routine.id">
          
          <ActivityCard :maxWidth="250" class="mt-4" :own="isOwn()"
            :data="Routine" :isRoutine="true" :detailComponent="detailComponent"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="getRoutines"/>
    </v-container>
    
    <div v-else class="text-h5 mb-6 text-center mt-15">
      <div v-if="isOwn()">
        <h1>You do not have any routines! Add one to start now!</h1>
        <v-row>
          <v-spacer />
          <v-img class="mt-6" :src="img" max-width="500"></v-img>
          <v-spacer />
        </v-row>
      </div>
      <div v-else>
        <h1>There are no routines yet! Add one in "My Routines"!</h1>
        <v-row>
          <v-spacer />
          <v-img class="mt-6" :src="img" max-width="500"></v-img>
          <v-spacer />
        </v-row>
      </div>
    </div>

    <div v-if="isOwn()">
      <AddRoutine/>
    </div>
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
      async getRoutines(){
        if(this.$route.params.of == "own")
          this.Routines = await UserApi.getAllRoutines(null,this.currPage-1,8); 
        else
          this.Routines = await RoutineApi.getAll(this.currPage-1, 8);      
      
        this.amountOfPages = Math.ceil(this.Routines.totalCount / this.Routines.size);
      },

      isOwn(){
        return this.$route.params.of == "own";
      }
    }, 

    data: ()=>({
      currPage: 1,
      img: require('../../assets/gym-animated.webp'),
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
      this.getRoutines();
    },

    components: { Navbar, ActivityCard, AddRoutine},
  } 
</script>