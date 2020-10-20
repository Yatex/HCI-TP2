<template>
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

        <v-expansion-panels>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Add warm up exercises:
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row >
              <v-col v-for="exercise in exercises" :key="exercise.id">
                <CheckCard :maxWidth="250" :data="exercise" :detailComponent="exerciseDetailComponent"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Add training exercises:
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-col v-for="exercise in exercises" :key="exercise.id">
                <CheckCard :maxWidth="250" :data="exercise" :detailComponent="exerciseDetailComponent"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>
            Add cool down exercises:
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-row>
              <v-col v-for="exercise in exercises" :key="exercise.id">
                <CheckCard :maxWidth="250" :data="exercise" :detailComponent="exerciseDetailComponent"/>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
       
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
import ExerciseDetail from './../exercises/ExerciseDetail';
import mockExercises from '../../mock_data/exercices';
import CheckCard from '../../components/CheckCard';

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
      exercises: mockExercises,
      exerciseDetailComponent: ExerciseDetail,
    }),
    components: { 
      CheckCard
    },
}
</script>
