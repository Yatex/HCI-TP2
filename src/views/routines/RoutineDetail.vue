<template>
  <v-dialog max-width="600px">

    <template v-slot:activator="{on, attrs}">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </template>
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="img"/>

      <v-card-title>{{data.title}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{data.difficulty}}
        </div>

        <div class="my-2">
          {{data.details}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Exercises</v-card-title>

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

      <v-card-actions> 
  
      <v-dialog v-model="dialog" max-width="290" >
        <v-card>
          <v-card-title class="headline">
            Delete {{ data.name }}
          </v-card-title>
  
          <v-card-text>
            This can not be undone! Continue?
          </v-card-text>
  
          <v-card-actions>
            <v-btn color="red darken-1" text @click="deleteRoutine()" >
              Yes, delete
            </v-btn>
            <v-spacer />
            <v-btn color="grey lighten-1" text @click="dialog = false" >
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-btn color="red darken-1" @click.stop="dialog = true" text>
          Delete
        </v-btn>
        <v-spacer />
        <v-btn color="accent darken-3" text>
          Add to Favourites
        </v-btn>
        <v-btn color="accent darken-3" :own="isOwn()" text>
          Edit Excercise
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>
</template>


<script>
  import { RoutineApi } from '../../api/routines.js';
  import { PromiseBuilder } from 'vue-promise-builder'

  export default {
    props: ['data', 'editable'],

    data: () => ({
      img: require('../../assets/gym.jpg'),
      dialog: false
    }),

    methods: {
      async getExercises(id){
        return await RoutineApi.getExercises(this.data.id, id);
      },
      deleteRoutine(){
        RoutineApi.delete(this.data.id);
        this.dialog = false;
      },
      isOwn(){
        return this.$route.params.of == "own";
      }
    },

    asyncComputed: {
      async cycles(){
        return await RoutineApi.getCycles(this.data.id);
      }
    },

    components: {PromiseBuilder}
  }
</script>