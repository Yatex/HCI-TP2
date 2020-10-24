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

        <!-- --------------------------  ROUTINE  ------------------------------------------ -->
        
        <v-stepper-content step="1">
          <v-form ref="routineForm" lazy-validation>
            <v-text-field label="Name" v-model="routine.name"
              :rules="rules.name" outlined/>

            <v-select label="Category" :items="categories" item-text="name" v-model="routine.category.id"
              :rules="rules.category" item-value="id" outlined/>

            <v-select label="Difficulty" :items="difficulties" item-text="name" item-value="value"
              :rules="rules.difficulty" v-model="routine.difficulty" outlined/>

            <v-textarea label="Detail" v-model="routine.detail"
              :rules="rules.detail" outlined/>

            <v-btn color="primary" @click="verifyRoutine">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-form>
        </v-stepper-content>

        <!-- --------------------------  CYCLES  ------------------------------------------ -->

        <v-stepper-content step="2">
          <v-list two-line v-if="cycles.length > 0">
            Drag items to order them
            <draggable :list="cycles" @start="drag=true" @end="drag=false">
              <div v-for="cycle in cycles" :key="cycle.id">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="cycle.name"/>
                    <v-list-item-subtitle v-text="cycle.type.capitalize()"/>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon color="grey lighten-1" @click="removeCycle(cycle)">
                      mdi-close
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </draggable>
          </v-list>

          <div v-else>
            Here you can add the cycles for the routine
          </div>

          <div class="mt-4">
            <v-btn color="primary" @click="showAddCycleDialog=true">Add Cycle</v-btn>
            <v-btn color="primary" @click="e1=1" class="ml-4">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn color="primary" @click="verifyCycles" class="ml-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <AddCycle :dialog="showAddCycleDialog" @save="addCycle($event)" @cancel="showAddCycleDialog=false"/>
        </v-stepper-content>

        <!-- --------------------------  EXERCISES  ------------------------------------------ -->

        <v-stepper-content step="3">
          <v-list two-line v-if="exercises.length > 0">
            <template v-for="exercise in exercises">
              <v-list-item :key="exercise.id">
                <v-list-item-content>
                  <v-list-item-title v-text="exercise.name"/>
                  <v-list-item-subtitle v-text="getCycleById(exercise.cycle).name"/>
                </v-list-item-content>

                <v-list-item-action>
                  <v-icon color="grey lighten-1" @click="removeExercise(exercise)">
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
            <v-btn color="primary" @click="e1=2" class="ml-4">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn color="primary" @click="verifyExercises" class="ml-4">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <AddExercise :dialog="showAddExerciseDialog" :cycles="cycles"
            @save="addExercise($event)" @cancel="showAddExerciseDialog=false"/>
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
      <v-btn v-bind="attrs" v-on="on" color="accent black--text" class="mt-5" elevation="2"
          fab absolute right bottom dark x-large>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>

  </v-dialog>
</template>

<script>
  import { RoutineApi } from '../../api/routines.js';
  import { CategoryApi } from '../../api/categories.js';

  import AddCycle from './AddCycle';
  import AddExercise from '../exercises/AddExercise';
  import draggable from 'vuedraggable';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default { 
    methods:{
      // --------------------------  ROUTINES  ------------------------------------------

      async verifyRoutine(){
        if(this.$refs.routineForm.validate())
          this.e1 = 2;
      },

      // --------------------------  CYCLES  ------------------------------------------

      addCycle(cycle){
        this.showAddCycleDialog = false;
        cycle.id = this.cycles.length;
        let cycleCopy = Object.assign({}, cycle);
        this.cycles.push(cycleCopy);
      },

      removeCycle(cycle){
        this.cycles = this.cycles.filter(c => c.id != cycle.id);
      },

      verifyCycles(){
        for(let i=0; i<this.cycles.length; i++){
          if( (i == 0 && this.cycles[i].type != "warmup")
              || (i == this.cycles.length-1 && this.cycles[i].type != "cooldown")
          ){
            this.snackbarText = "Warmup cycle should be first and cooldown cycle should be last";
            this.showSnackbar = true;
            return;
          }
        }

        if( this.cycles.length < 3
            || this.cycles.filter(c => c.type=='exercise').length < 1
            || this.cycles.filter(c => c.type=='warmup').length != 1
            || this.cycles.filter(c => c.type=='cooldown').length != 1
        ){
          this.snackbarText = 'You have to add 1 warmup, 1 cooldown and 1 or more exercise cycles';
          this.showSnackbar = true;
        }else{
          this.e1 = 3;
        }
      },

      getCycleById(id){
        return this.cycles.filter(c => c.id == id)[0];
      },

      // --------------------------  EXERCISES  ------------------------------------------

      addExercise(exercise){
        this.showAddExerciseDialog = false;
        let exerciseCopy = Object.assign({}, exercise);
        exerciseCopy.id = this.exercises.length;
        this.exercises.push(exerciseCopy);
      },

      removeExercise(exercise){
        this.exercises = this.exercises.filter(e => e.id != exercise.id);
      },

      async verifyExercises(){
        let cycleIds = this.exercises.reduce((r, e) => {
          r[e.cycle] = [...r[e.cycle] || [], e];
          return r;
        }, {});

        if(Object.keys(cycleIds).length < this.cycles.length){
          this.snackbarText = 'You have to add at least 1 exercise per cycle';
          this.showSnackbar = true;
        }else{
          this.snackbarText = 'Verified';
          this.showSnackbar = true;
          this.upload();
        }
      },

      // --------------------------  OVERALL  ------------------------------------------

      async upload(){

        this.showOverlay = true;

        try{

          // Upload the routine
          
          let res = await RoutineApi.add(this.routine);
          this.routine.id = res.id;

          // Upload the cycles

          for(let i=0; i<this.cycles.length; i++){
            let oldCycleId = this.cycles[i].id;
            delete this.cycles[i].id;

            this.cycles[i].order = i+1;
            let res = await RoutineApi.addCycle(this.routine.id, this.cycles[i]);
            this.cycles[i].id = res.id;

            for(let j=0; j<this.exercises.length; j++)
              if(this.exercises[j].cycle == oldCycleId)
                this.exercises[j].cycle = this.cycles[i].id;
          }

          // Upload the exercises

          for(let i=0; i<this.exercises.length; i++){
            delete this.exercises[i].id;
            let res = await RoutineApi.addExercise(this.routine.id, this.exercises[i].cycle, this.exercises[i]);
            this.exercises[i].id = res.id;
          }

        }catch(e){
          this.snackbarText = 'Ups! Something went wrong'; 
          this.showSnackbar = true;
          console.log(e);
        }

        this.showOverlay = false;
        this.snackbarText = 'Success!'; 
        this.showSnackbar = true;

      }
    },

    data: () => ({
      e1: 1,
      drag: false,
      dialog: false,
      showOverlay: false,
      showAddCycleDialog: false,
      showAddExerciseDialog: false,
      showSnackbar: false, snackbarText: '',
      difficulties: [
        {name: 'Rookie', value: 'rookie'}, {name: 'Begginer', value: 'begginer'},
        {name: 'Intermediate', value: 'intermediate'}, {name: 'Advanced', value: 'advanced'},
        {name: 'Expert', value: 'expert'}
      ],

      rules: {
        name: [ v => !!v || 'Name is required',
          v => (v && v.length < 100) || 'Name must be less than 100 characters'],
        detail: [ v => !!v || 'Detail is required',
          v => (v && v.length < 200) || 'Detail must be less than 200 characters'],
        category: [ v => !!v || 'Category is required'],
        difficulty: [ v => !!v || 'Difficulty is required'],
      },

      routine: {
        name: 'Body Shaker',
        detail: 'Forget about your physical integrity, this routine will destroy it!',
        difficulty: 'expert',
        isPublic: true,
        category: {id: 1},
      },

      cycles: [
        {id: 0, name: 'Move The Booty 1', detail: "It's time to move the ass!", type: 'warmup', repetitions: 2},
        {id: 1, name: 'Shake The Booty 1', detail: "It's time to shake the ass!", type: 'exercise', repetitions: 2},
        {id: 2, name: 'Cool The Booty 1', detail: "It's time to cool the ass!", type: 'cooldown', repetitions: 2},
      ],

      exercises: [
        {id: 0, name: 'Jumping frog', detail: "Ever felt like a frog? Let it be!", type: 'exercise', cycle: 1, repetitions: 6, duration: 10}
      ]
      
    }),

    asyncComputed: {
      async categories(){
        try{

          return await CategoryApi.getAll();

        }catch(e){

          this.snackbarText = "Ups! Something went wrong"
          this.showSnackbar = true;

        }
      }
    },

    components: { 
      AddCycle,
      AddExercise,
      draggable
    }
  }
</script>