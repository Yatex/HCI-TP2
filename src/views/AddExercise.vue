<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="accent" class="mt-5" elevation="2"
            fab fixed right bottom x-large>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-card>

          <v-toolbar dark color="grey darken-4">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New Exercise</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-title>
            <v-text-field label="Exercise's name" v-model="ExerciseName"></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-textarea label="Exercise's Instructions" v-model="ExerciseInstruction"></v-textarea>
            <v-textarea label="Exercise's Description" v-model="ExerciseDescription"></v-textarea>
            <v-select :items="items" label="Type of exercise" v-model="ExerciseImage" v-on:change="changeImg(ExerciseImage.image)"></v-select>
            <v-img :src="modeImage" height="250" width="250"></v-img>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" @click="dialog = false" class="mb-10 mt-5" bottom x-large>Save</v-btn>
            <v-spacer />
          </v-card-actions>
          
        </v-card>
      </v-dialog>
</template>


<script>
  export default {
      methods: {
        changeImg: function(image){
          this.modeImage = image;
        }
      },
      data: ()=>({
        dialog: '',
        modeImage: require('../assets/questionMark.png'),
        ExerciseName: '',
        ExerciseDescription: '',
        ExerciseInstruction: '',
        ExerciseImage: null,
        items: [
          { text: 'Warm Up', value: { image: require('../assets/warmup.jpeg')}},
          { text: 'Training', value: { image: require('../assets/training.jpeg')}},
          { text: 'Cool Down', value: { image: require('../assets/cooldown.jpeg')}},
        ]
      })
  }
</script>