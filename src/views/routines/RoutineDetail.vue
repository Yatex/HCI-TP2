<template>
  <v-dialog :value="dialog" @input="$emit('close')" max-width="600px">
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="img"/>

      <v-card-title>{{routine.name}}</v-card-title>

      <v-card-text>
        <div>
          {{routine.detail}}
        </div>
        <div>
          Difficulty: {{capitalize(routine.difficulty.toString())}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="grey--text text--darken-3">Cycles</v-card-title>

      <v-card-text>
        <v-expansion-panels>

          <v-expansion-panel v-for="cycle in cycles" :key="cycle.id">
            <v-expansion-panel-header>
              {{cycle.name}}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <PromiseBuilder v-slot="snapshot" :promise="getExercises(cycle.id)">
                <div v-if="snapshot.isPending">
                  <v-progress-circular indeterminate/>
                </div>
                <div v-else-if="snapshot.isSettled">
                  
                  <v-col v-for="exercise in snapshot.result" :key="exercise.id">
                    {{exercise.name}} - {{exercise.duration}}
                  </v-col>
                </div>
              </PromiseBuilder>
            </v-expansion-panel-content>
            
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="mt-4"> 
        <v-dialog v-model="showDeleteDialog" max-width="290" >
          <v-card>
            <v-card-title class="headline">
              Delete {{ routine.name }}
            </v-card-title>
    
            <v-card-text>
              This can not be undone! Continue?
            </v-card-text>
    
            <v-card-actions>
              <v-btn color="red darken-1" text @click="deleteRoutine()" >
                Yes, delete
              </v-btn>
              <v-spacer />
              <v-btn color="grey lighten-1" text @click="showDeleteDialog=false" >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="red darken-1" @click="showDeleteDialog=true" v-if="own" text>
          Delete
        </v-btn>

        <v-spacer/>

        <v-btn color="accent darken-3" text @click="favouriteRoutine">
          Add to Favourites
        </v-btn>

        <v-btn color="accent darken-3"  @click="showEditDialog=true" v-if="own" text>
          Edit Routine
        </v-btn>
      </v-card-actions>

    </v-card>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
    </v-snackbar>

  </v-dialog>
</template>


<script>
  import Vue from 'vue';
  import { RoutineApi } from '../../api/routines.js';
  import { UserApi } from '../../api/user.js';
  import { PromiseBuilder } from 'vue-promise-builder';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default {
    props: ['data', 'own', 'dialog'],

    data: function(){
      return {
        routine: Vue.util.extend({}, this.data),

        showEditDialog: false,
        showDeleteDialog: false,
        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',
        
        img: require('../../assets/gym.jpg'),
      }
    },

    methods: {
      updateRoutine(routine){
        this.showEditDialog = false;
        this.routine = routine;
        this.$emit('update', routine);
      },

      async deleteRoutine(){
        this.showDeleteDialog = false;
        this.showOverlay = true;

        try{
          this.showOverlay = true;
          
          await RoutineApi.delete(this.routine.id);

          this.showOverlay = false;
          this.$emit('delete', this.routine);
        }catch(e){
            this.showOverlay = false;
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong'; 
            console.log(e);
        }
      },

      async getExercises(id){
        return await RoutineApi.getExercises(this.routine.id, id);
      },

      async favouriteRoutine(){
          try{

            await UserApi.addFavouriteRoutine(this.routine.id,null)

          }catch(e){
                
              if(e.code == 2){
                  // this.showSnackbar = true;
                  // this.snackbarText = 'Its already a Favourite of yours'; 
                  // this.showSnackbar = true;
                  // console.log('esto 1');
                  this.isFavourite=true;
              }else{
                  // this.showSnackbar = true;
                  // this.snackbarText = 'Ups! Something went wrong'; 
                  // this.showSnackbar = true;
                  // console.log('esto 2');
              }
          
              console.log(e);

          }
          this.isFavourite=true;
          // this.showOverlay = false;
          // this.snackbarText = 'Success!'; 
          // this.showSnackbar = true;

      },

      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    asyncComputed: {
      async cycles(){
        return await RoutineApi.getCycles(this.routine.id);
      }
    },

    components: {PromiseBuilder}
  }
</script>