<template>
  <div class="Routines">
    <Navbar />

    <h1 class="ml-6 mt-6"> Your Routines: </h1>

    <v-container>
            <!--componentes q haga mati van aca -->
    </v-container>
    
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="accent" class="mt-5" elevation="2" fab fixed right bottom x-large>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="grey darken-4">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>New Routine</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-title>
            <v-text-field label="Routine's name" v-model="RoutineName"></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-textarea label="Routine's Description" v-model="RoutineDescription"></v-textarea>
            <v-radio-group label="Routine's Category" column v-model="RoutineCategory">
              <v-radio value="category 1" label="Category 1" class="mt-4"></v-radio>
              <v-radio value="category 2" label="Category 2"></v-radio>
              <v-radio value="category 3" label="Category 3"></v-radio>
              <v-radio value="category 4" label="Category 4"></v-radio>
              <v-radio value="category 5" label="Category 5"></v-radio>
            </v-radio-group>
              <v-card height="300" class="mt-8">
                <v-card-title>Warm up exercises:</v-card-title>
                <v-layout row wrap>
                  <v-flex v-for="exercise in warmpUpExercises" :key="exercise.name">
                    <!-- <Prueba /> -->
                  </v-flex>
                </v-layout>
              <v-card-text></v-card-text>
              <v-card-actions>
                <v-btn color="accent" absolute="" large bottom right>Add exercise</v-btn>
              </v-card-actions>
              </v-card>

              <v-card height="300" class="mt-8">
                <v-row>
                <v-card-title>Training exercises:</v-card-title>
                </v-row>
                <v-layout row wrap>
                  <v-flex v-for="exercise in trainingExercises" :key="exercise.name">
                    <!-- <Prueba /> -->
                  </v-flex>
                </v-layout>
                <v-card-actions>
                <v-btn color="accent" absolute="" large bottom right>Add exercise</v-btn>
              </v-card-actions>
              </v-card>

              <v-card height="300" class="mt-8">
                <v-card-title>Cool down exercises:</v-card-title>
                <v-layout row wrap>
                  <v-flex v-for="exercise in coolDownExercises" :key="exercise.name">
                    <!-- <Prueba /> -->
                  </v-flex>
                </v-layout>
                <v-card-actions>
                <v-btn color="accent" absolute="" large bottom right>Add exercise</v-btn>
              </v-card-actions>
              </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" @click="dialog = false" class="mb-10 mt-5" bottom x-large>Save</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
    data: () => ({
      dialog: false,
      routines: [],
      coolDownExercises: [],
      trainingExercises: [],
      warmUpExercises: [],
      RoutineName: '',
      RoutineDescription: '',
      RoutineCategory: '',
    }),
    components: {
        Navbar,
        Footer
    },
}
</script>
