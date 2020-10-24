<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" persistent>
    <v-card>

      <v-card-title>New Cycle</v-card-title>

      <v-card-text>
        <v-form v-model="validForm">
          <v-text-field label="Name" :value="data.name" @input="routine.name=$event"
            :rules="rules.name" outlined/>

          <v-select label="Category" :items="categories" item-text="name"
            :value="data.category.id" @input="routine.category.id=$event"
            :rules="rules.category" item-value="id" outlined/>

          <v-select label="Difficulty" :items="difficulties" item-text="name" item-value="value"
            :value="data.difficulty" @input="routine.difficulty=$event"
            :rules="rules.difficulty" v-model="routine.difficulty" outlined/>

          <v-textarea label="Detail" :value="data.detail" @input="routine.detail=$event"
            :rules="rules.detail" outlined/>
        </v-form>
      </v-card-text>
    
      <v-card-actions>
        <v-spacer/>
        <v-btn :disabled="!validForm" color="primary" @click="save()" bottom large>Save</v-btn>
        <v-btn color="primary" @click="$emit('cancel');" bottom large>Cancel</v-btn>
        <v-spacer/>
      </v-card-actions>

      <v-overlay :value="showOverlay">
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>

      <v-snackbar v-model="showSnackbar">
        {{ snackbarText }}
      </v-snackbar>

    </v-card>
  </v-dialog>
</template>

<script>
  import Vue from 'vue';
  import { RoutineApi } from '../../api/routines.js';
  import { CategoryApi } from '../../api/categories.js';

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }

  export default {
    props: ['dialog', 'data'],

    methods:{
      async save(){
        try{
          this.showOverlay = true;

          await RoutineApi.modify(this.routine);

          this.showOverlay = false;
          this.$emit('save', this.routine);
        }catch(e){
            this.snackbarText = 'Ups! Something went wrong';
            console.log(e);

            this.showOverlay = false;
            this.showSnackbar = true;
        }
      }   
    },

    data: function(){
      return {
        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',

        validForm: false,

        types: [
          {name: 'Warm up', value: 'warmup'}, {name: 'Exercise', value: 'exercise'}, {name: 'Cool down', value: 'cooldown'}
        ],

        routine: Vue.util.extend({}, this.data),

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
        }  
      }
    },

    asyncComputed: {
      async categories(){
        try{

          return await CategoryApi.getAll();

        }catch(e){

          this.snackbarText = "Ups! Something went wrong"
          this.showSnackbar = true;

          console.log(e);

        }
      }
    }
  }
</script>