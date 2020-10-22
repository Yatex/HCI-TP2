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

      <v-img height="250" :src="data.img"></v-img>

      <v-card-title>{{data.title}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{data.difficulty}}
        </div>

        <div class="my-2">
          {{data.desc}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Exercises</v-card-title>

      <v-card-text v-for="exercise in data.exercises" :key="exercise.id">
        {{getExercise(exercise.id).title}} - {{exercise.duration}}
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent darken-3" text>
          Add to Favs
        </v-btn>
        <v-btn color="accent darken-3" text>
          Edit Excercise
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>


<script>
    import mockExercises from '../../mock_data/exercices'

    export default {
      props: ['data'],
      methods: {
        getExercise: function(id){
          return mockExercises[id]
        }
      }
    }
</script>