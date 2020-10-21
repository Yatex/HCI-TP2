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
          <v-form ref="routineForm" v-model="validForm" lazy-validation>
            <v-text-field label="Name" v-model="routine.name" outlined/>

            <v-select label="Category" :items="categories" item-text="name"
              v-model="routine.category.id" item-value="id" outlined/>

            <v-select label="Difficulty" :items="difficulties"
            v-model="routine.difficulty" outlined/>

            <v-textarea label="Description" v-model="routine.description" outlined/>

            <v-btn color="primary" @click="goAddCycle">Next</v-btn>
          </v-form>
        </v-stepper-content>


        <v-stepper-content step="2">
          <v-list two-line v-if="cycles.length > 0">
            <template v-for="cycle in cycles">
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
            <v-btn color="primary" @click="goAddExercises" class="ml-4">Continue</v-btn>
          </div>

          <AddCycle :dialog="showAddCycleDialog" v-on:save="addCycle($event)"/>
        </v-stepper-content>


        <v-stepper-content step="3">
          <v-list two-line v-if="exercises.length > 0">
            <template v-for="exercise in exercises">
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

          <AddExercise :dialog="showAddExerciseDialog" :cycles="cycles" @save="addExercise($event)"/>
        </v-stepper-content>


      </v-stepper-items>
    </v-stepper>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
    </v-snackbar>

    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="accent" class="mt-5" elevation="2" fab fixed right bottom x-large>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

  </v-dialog>
</template>

<script>
  // import { RoutineApi } from '../../api/routines.js';
  import { CategoryApi } from '../../api/categories.js';

  import AddCycle from './AddCycle';
  import AddExercise from '../exercises/AddExercise';

  export default { 
    methods:{
      async goAddCycle(){
        if(this.$refs.routineForm.validate()){
          try{

            console.log(JSON.stringify(this.routine));

            // await RoutineApi.add(this.routine);

          }catch(e){
            this.snackbarText = 'Ups! Something went wrong'; 
            this.showSnackbar = true;
            console.log(e);
          }
        }
      },

      addCycle(cycle){
        this.showAddCycleDialog = false;
        this.cycles.push(cycle);
      },
      removeCycle(cycle){
        this.cycles = this.cycles.filter(c => c.name == cycle.name);
      },

      addExercise(cycle){
        this.showAddExerciseDialog = false;
        this.exercises.push(cycle);
      },
      removeExercise(cycle){
        this.exercises = this.exercises.filter(c => c.name == cycle.name);
      },


      goAddExercises(){
        if(this.cycles.length < 3 || this.cycles.filter(c => c.type=='exercise').length < 1
            || this.cycles.filter(c => c.type=='warmup').length != 1
            || this.cycles.filter(c => c.type=='cooldown').length != 1){
          this.snackbarText = 'You have to add 1 warmup, 1 cooldown and 1 or more exercise cycles';
          this.showSnackbar = true;
        }else{
          this.e1 = 3;
        }
      }
    },

    data: () => ({
      e1: 1,
      dialog: false,
      showOverlay: false,
      showAddCycleDialog: false,
      showAddExerciseDialog: false,
      showSnackbar: false, snackbarText: '',
      difficulties: ['rookie', 'beginner', 'intermediate', 'advanced', 'expert'],

      routine: {
        name: 'Body Shaker',
        description: 'Forget about your physical integrity, this routine will destroy it!',
        difficulty: 'expert',
        isPublic: true,
        category: {id: 0},
      },

      cycles: [
        {name: 'Move The Booty', description: "It's time to shake the ass!", type: 'warmup', repetitions: 2, order: 0},
        {name: 'Move The Booty 2', description: "It's time to shake the ass!", type: 'exercise', repetitions: 2, order: 0},
        {name: 'Move The Booty 3', description: "It's time to shake the ass!", type: 'cooldown', repetitions: 2, order: 0},
      ],
      exercises: []
      
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
