<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
    <v-stepper v-model="e1">

      <v-stepper-header>
        <v-stepper-step :complete="e1>1" step="1">
          Basic information
        </v-stepper-step>

        <v-stepper-step :complete="e1>2" step="2">
          Add cycles
        </v-stepper-step>

        <v-stepper-step :complete="e1>3" step="3">
          Add exercises
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        
        <v-stepper-content step="1">
          <v-text-field label="Name" v-model="routine.name" outlined/>

          <v-select label="Category" :items="categories" item-text="name"
            v-model="routine.category" item-value="id" outlined/>

          <v-select label="Difficulty" :items="difficulties"
           v-model="routine.difficulty" outlined/>

          <v-textarea label="Description" v-model="routine.description" outlined/>

          <v-btn color="primary" @click="e1=2">Next</v-btn>
        </v-stepper-content>


        <v-stepper-content step="2">
          <v-list two-line v-if="routine.cycles.length > 0">
            <template v-for="cycle in routine.cycles">
              <v-list-item :key="cycle.name">
                <v-list-item-content>
                  <v-list-item-title v-text="cycle.name"/>
                  <v-list-item-subtitle v-text="cycle.type"/>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="grey lighten-1" @click="removeCycle(cycle.name)">
                    mdi-close
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>

          <div v-else>
            Here you can add the cycles for the routine
          </div>

          <div class="mt-4">
            <v-btn color="primary" @click="showAddCycleDialog=true">Add Cycle</v-btn>
            <v-btn color="primary" @click="e1=3" class="ml-4">Continue</v-btn>
          </div>

          <AddCycle :dialog="showAddCycleDialog" v-on:save="addCycle($event)"/>
        </v-stepper-content>


        <v-stepper-content step="3">
          <v-list two-line v-if="routine.exercises.length > 0">
            <template v-for="exercise in routine.exercises">
              <v-list-item :key="exercise.name">
                <v-list-item-content>
                  <v-list-item-title v-text="exercise.name"/>
                  <v-list-item-subtitle v-text="exercise.type"/>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="grey lighten-1" @click="removeExercise(exercise.name)">
                    mdi-close
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>

          <div v-else>
            Here you can add the exercises for your cycles
          </div>

          <div class="mt-4">
            <v-btn color="primary" @click="showAddExerciseDialog=true">Add Exercise</v-btn>
            <v-btn color="primary" @click="addRoutine" class="ml-4">Continue</v-btn>
          </div>

          <AddExercise :dialog="showAddExerciseDialog" v-on:save="addExercise($event)"/>
        </v-stepper-content>


      </v-stepper-items>
    </v-stepper>

    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="accent" class="mt-5" elevation="2" fab fixed right bottom x-large>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

  </v-dialog>
</template>

<script>
  import { RoutineApi } from '../../api/routines.js';
  import { CategoryApi } from '../../api/categories.js';

  import AddCycle from './AddCycle';
  import AddExercise from '../exercises/AddExercise';

  export default { 
    methods:{
      addRoutine(){
        RoutineApi.add({
          "name": this.name,
          "detail": this.description,
          "isPublic": true,//hay que cambiar por mejor logica esto
          "difficulty": "rookie",//agregar dificultades
          "category": {           //agregar categorias?
            "id": 1
          }
        }).catch(//lanzar error
        )
      },

      addCycle(cycle){
        this.showAddCycleDialog = false;
        this.routine.cycles.push(cycle);
      },
      removeCycle(cycle){
        this.routine.cycles = this.routine.cycles.filter(c => c.name == cycle.name);
      },

      addExercise(cycle){
        this.showAddExerciseDialog = false;
        this.routine.exercises.push(cycle);
      },
      removeExercise(cycle){
        this.routine.exercises = this.routine.exercises.filter(c => c.name == cycle.name);
      },

      addRoutineWrapper(){
        this.addRoutine();
        this.dialog = false;
      }
    },

    data: () => ({
      e1: 1,
      dialog: false,
      showAddCycleDialog: false,
      showAddExerciseDialog: false,
      difficulties: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],

      routine: {
        name: '',
        description: '',
        difficulty: '',
        category: 0,
        cycles: [],
        exercises: []
      },
      
    }),

    asyncComputed: {
      async categories(){
        return await CategoryApi.getAll();
      }
    },

    components: { 
      AddCycle,
      AddExercise
    }
  }
</script>
