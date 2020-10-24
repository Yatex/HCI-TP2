<template>
  <div>

    <Navbar/>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-container v-if="routines.length > 0">
      <v-row class="mb-6" no-gutters>
        <v-col v-for="routine in routines" :key="routine.id">
          
          <ActivityCard :maxWidth="250" class="mt-4" :own="isOwn()" :isRoutine="true"
            :data="routine" :detailComponent="detailComponent"
            @update="updatedRoutine($event)" @delete="deletedRoutine($event)"/>
          
        </v-col>
      </v-row>
      <v-pagination v-model="currPage" :length="amountOfPages" @input="getRoutines"/>
    </v-container>
    
    <div v-else-if="!showOverlay" class="text-h5 mb-6 text-center mt-15">
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
      async updatedRoutine(routine){
        for(let i=0; i<this.routines.length; i++)
          if(this.routines[i].id == routine.id)
            this.routines[i] = routine;
      },

      async deletedRoutine(routine){
        this.routines = this.routines.filter(r => r.id != routine.id);
      },

      async getRoutines(){
        let routines;

        if(this.$route.params.of == "own")
          routines = await UserApi.getAllRoutines(null,this.currPage-1,8); 
        else
          routines = await RoutineApi.getAll(this.currPage-1, 8);      
      
        this.routines = routines.results;
        this.amountOfPages = Math.ceil(routines.totalCount / routines.size);
        this.showOverlay = false;
      },

      isOwn(){
        return this.$route.params.of == "own";
      }
    }, 

    data: ()=>({
      currPage: 1,
      amountOfPages: undefined,
      routines: [],
      showOverlay: true,

      detailComponent: RoutineDetail,
      img: require('../../assets/gym-animated.webp'),
    }),

    watch: { 
     '$route.params.of': {
        handler: function() {
          this.getRoutines();
        }
      }
    },

    created(){
      this.getRoutines();
    },

    components: { Navbar, ActivityCard, AddRoutine},
  } 
</script>