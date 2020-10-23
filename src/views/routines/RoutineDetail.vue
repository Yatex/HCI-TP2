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
        <v-btn color="accent darken-3" text>
          Add to Favs
        </v-btn>
        <v-btn v-if="editable" color="accent darken-3" text>
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
      img: require('../../assets/gym.jpg')
    }),

    methods: {
      async getExercises(id){
        return await RoutineApi.getExercises(this.data.id, id);
      },
    },

    asyncComputed: {
      async cycles(){
        return await RoutineApi.getCycles(this.data.id);
      }
    },

    components: {PromiseBuilder}
  }
</script>