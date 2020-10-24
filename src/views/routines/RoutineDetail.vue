<template>
  <v-dialog :value="dialog" @input="$emit('close')" max-width="600px">
    
    <v-card>

      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="img"/>

      <v-card-title>{{routine.name}}</v-card-title>

      <v-card-subtitle>Designed for {{routine.difficulty}}</v-card-subtitle>

      <v-card-text>
        {{routine.detail}}
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title class="grey--text text--darken-3">Cycles</v-card-title>

      <v-card-text>
        <div v-if="loadingCycles">
          <v-progress-circular indeterminate/>
        </div>

        <v-expansion-panels v-else>

          <v-expansion-panel v-for="cycle in cycles" :key="cycle.id" @change="getExercises(cycle.id)">
            <v-expansion-panel-header>
              {{cycle.name}}
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              
              <v-card-text>

                <div class="mb-4">
                  <v-icon>mdi-information-outline</v-icon> {{cycle.detail}}
                </div>

                <div class="my-4">
                  <v-icon>repeat</v-icon> {{cycle.repetitions}} times
                </div>

              </v-card-text>

              <v-row>
                <v-dialog v-model="showDeleteCycleDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">
                      Delete {{ cycle.name }}
                    </v-card-title>
            
                    <v-card-text>
                      This can not be undone! Continue?
                    </v-card-text>
            
                    <v-card-actions>
                      <v-btn color="red darken-4" text @click="deleteCycle(cycle)" >
                        Yes, delete
                      </v-btn>
                      <v-spacer />
                      <v-btn color="grey lighten-1" text @click="showDeleteCycleDialog=false" >
                        No
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn class="ml-5" color="darken-4" @click="showDeleteCycleDialog=true" v-if="own" icon>
                  <v-icon>delete</v-icon>
                </v-btn>

                <v-spacer/>

                <v-btn color="darken-3" @click="currCycle=cycle; showEditCycleDialog=true;" v-if="own" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                
              </v-row>

              <v-divider class="mt-2"/>

              <div v-if="loadingExercises">
                <v-progress-circular indeterminate/>
              </div>
              
              <div v-else>
                <v-card-title>Exercises</v-card-title>

                <v-card-text>
                  <v-col v-for="exercise in exercises" :key="exercise.id">          
                    <v-row>

                      Do {{exercise.name}} for {{exercise.duration}} secs, repeat {{exercise.repetitions}} times
                      
                      <v-spacer/>
                      
                      <v-btn icon @click="showExerciseDetail=true">
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>

                      <ExerciseDetail :data="exercise" :own="own" :dialog="showExerciseDetail"
                        @close="showExerciseDetail=false" @update="updatedExercise($event)"
                          @delete="deletedExercise($event)"/>

                    </v-row>
                  </v-col>
                </v-card-text>
              </div>

            </v-expansion-panel-content>
            
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="mt-4"> 
        <v-dialog v-model="showDeleteRoutineDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">
              Delete {{ routine.name }}
            </v-card-title>
    
            <v-card-text>
              This can not be undone! Continue?
            </v-card-text>
    
            <v-card-actions>
              <v-btn color="red darken-3" text @click="deleteRoutine()" >
                Yes, delete
              </v-btn>
              <v-spacer />
              <v-btn color="grey lighten-1" text @click="showDeleteRoutineDialog=false" >
                No
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="red darken-3" @click="showDeleteRoutineDialog=true" v-if="own" text>
          Delete
        </v-btn>

        <v-spacer/>

        <v-dialog v-model="showReviewDialog" max-width="450" >
          <v-card>
            <v-row>
              
              <v-card class="ml-5 mt-2 mr-5" width="100%">
              <v-card-title class="headline">
                Write a review
              </v-card-title>
              <v-card-text>
                <v-rating value="0" v-model="rating" length="5" color="orange darken-4" background-color="grey darken-4"></v-rating>
                <v-text-field v-model="review" label="Review"></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn text color="primary text-center black--text" class="accent" @click="sendRating()">Send Review</v-btn>
              </v-card-actions>
              </v-card>

              <v-card-title class="headline ml-3 mt-5">
                Reviews about {{ routine.name }}:
              </v-card-title>

              <v-card-text>
                <div v-if="reviews.length > 0">
                  <v-col v-for="review in reviews" :key="review.id">
              
                    <ReviewCard :maxWidth="500" class="mt-4" :card="{ rating: review.score, review: review.review}" />
                    
                  </v-col>
                </div>
                <div v-else>
                  <p class="ml-5">There are no reviews about {{ routine.name }}, be the first one!</p>
                </div>
              </v-card-text>

            </v-row>
          </v-card>
        </v-dialog>
        
        <v-btn bold color="accent darken-4" @click="openReviews()" text>
          Reviews
        </v-btn>

        <v-btn bold color="accent darken-4" @click="showEditRoutineDialog=true" v-if="own" text>
          Edit Routine
        </v-btn>
      </v-card-actions>

    </v-card>

    <EditRoutine :data="routine" :dialog="showEditRoutineDialog" @save="updatedRoutine($event)"
        @cancel="showEditRoutineDialog=false"/>

    <EditCycle :data="currCycle" :dialog="showEditCycleDialog" @save="updatedCycle($event)"
        @cancel="showEditCycleDialog=false"/>

    <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
    </v-overlay>

    <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
    </v-snackbar>

  </v-dialog>
</template>


<script>
  import Vue from 'vue';
  import { RoutineApi } from '../../api/routines.js';

  import EditRoutine from './EditRoutine';
  import EditCycle from './EditCycle';
  import ExerciseDetail from '../exercises/ExerciseDetail';
  import ReviewCard from '../../components/ReviewCard';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default {
    props: ['data', 'own', 'dialog'],

    data: function(){
      return {
        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',

        showReviewDialog: false,
        rating: 0,
        review: '',
        reviews: [],

        showEditRoutineDialog: false,
        showDeleteRoutineDialog: false,
        routine: Vue.util.extend({}, this.data),

        showExerciseDetail: false,
        loadingExercises: false,
        exercises: [],

        showEditCycleDialog: false,
        showDeleteCycleDialog: false,
        loadingCycles: false,
        cycles: [],
        currCycle: undefined,
        
        img: require('../../assets/gym.jpg'),
      }
    },

    methods: {
      // --------------------------------- REVIEWS ---------------------------------

      async getRatings(){
        try{
          let answer;
          answer = await RoutineApi.getRatings(this.routine.id);
          this.reviews = answer.results;
        }catch(e){
          this.showSnackbar = true;
          this.snackbarText = 'Ups! Something went wrong while bringing the reviews'; 
        }
      },

      async sendRating(){
          try{
            await RoutineApi.rateRoutine(this.routine.id, {
              "score": this.rating,
              "review": this.review
            });
            this.showSnackbar = true;
            this.snackbarText = 'Review sent with success!'; 
          }catch(e){
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong while sending the review'; 
          }
          this.showReviewDialog = false;
      },

      openReviews(){
        this.getRatings();
        this.showReviewDialog = true;
      },

      // --------------------------------- ROUTINE ---------------------------------

      updatedRoutine(routine){
        this.showEditRoutineDialog = false;
        this.routine = routine;
        this.$emit('update', routine);
      },

      async deleteRoutine(){
        this.showDeleteRoutineDialog = false;
        this.showOverlay = true;

        try{
          this.showOverlay = true;
          await RoutineApi.delete(this.routine.id);
          
          this.showOverlay = false;
          this.$emit('delete', this.routine);
        }catch(e){
            this.showOverlay = false;
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong'; 
            console.log(e);
        }
      },

      // --------------------------------- CYCLES ---------------------------------

      async getCycles(){
        this.loadingCycles = true;
        let cycles = await RoutineApi.getCycles(this.routine.id);

        for(let i=0; i<cycles.length; i++)
          cycles[i].routineId = this.routine.id;

        this.cycles = cycles;
        this.currCycle = cycles[0];
        this.loadingCycles = false;
      },

      updatedCycle(cycle){
        this.showEditCycleDialog = false;

        for(let i=0; i<this.cycles.length; i++)
          if(this.cycles[i].id == cycle.id)
            this.cycles[i] = cycle;
      },

      async deleteCycle(cycle){
        this.showDeleteCycleDialog = false;
        this.showOverlay = true;

        try{
          this.showOverlay = true;
          
          await RoutineApi.deleteCycle(this.routine.id, cycle.id);

          this.cycles = this.cycles.filter(c => c.id != cycle.id)

          this.showOverlay = false;
        }catch(e){
            this.showOverlay = false;
            this.showSnackbar = true;
            this.snackbarText = 'Ups! Something went wrong'; 
            console.log(e);
        }
      },

      // --------------------------------- EXERCISES ---------------------------------

      async getExercises(cycleId){
        this.loadingExercises = true;
        let exercises = await RoutineApi.getExercises(this.routine.id, cycleId);

        for(let i=0; i<exercises.length; i++){
          exercises[i].routineId = this.routine.id;
          exercises[i].cycleId = cycleId;
        }

        this.exercises = exercises;
        this.loadingExercises = false;
      },

      updatedExercise(exercise){
        for(let i=0; i<this.exercises.length; i++)
          if(this.exercises[i].id == exercise.id)
            this.exercises[i] = exercise;
      },

      deletedExercise(exercise){
        this.exercises = this.exercises.filter(e => e.id != exercise.id);
      },

      // --------------------------------- OTHERS ---------------------------------

      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    created(){
      this.getCycles();
    },

    components: {EditCycle, ExerciseDetail, ReviewCard, EditRoutine}

  }
</script>