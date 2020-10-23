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

      <v-img :src="img" height="200px" width="300"/>

      <v-card-title>{{data.name}}</v-card-title>

      <v-card-text>
        <div class="subtitle-1">
          {{data.type}}
        </div>

        <div class="my-2">
          {{data.desc}}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Instructions</v-card-title>

      <v-card-text>
        {{data.instructions}}
      </v-card-text>

      <v-card-actions>
        <v-btn color="accent darken-3" text>
          Add to Favs
        </v-btn>
        <v-btn v-if="own" color="accent darken-3" text>
          Edit Excercise
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>


<script>
    export default {
      props: ['data', 'own'],
      data: () => ({
          img: require('../../assets/gym2.jpg')
      })
    }
</script>