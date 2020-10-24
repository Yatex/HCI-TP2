<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" persistent>
    <v-card>

      <v-card-title>New Exercise</v-card-title>

      <v-card-text>
        <v-form v-model="validForm">
          <v-text-field label="Name" v-model="exercise.name"
            :rules="rules.name" outlined/>

          <v-textarea label="Detail" v-model="exercise.detail"
            :rules="rules.detail" outlined/>

          <v-text-field label="Duration" v-model="exercise.duration"
            :rules="rules.duration" type="numeric" outlined/>

          <v-text-field label="Repetitions" v-model="exercise.repetitions"
            :rules="rules.repetitions" type="numeric" outlined/>

          <v-select label="Type" :items="types" v-model="exercise.type"
            :rules="rules.type" item-text="name" item-value="value" outlined/>

          <v-select label="Cycle" v-model="exercise.cycle" :items="cycles"
            :rules="rules.cycle" item-value="id" item-text="name" outlined/>

            <v-text-field label="Image" v-model="exercise.imgUrl" outlined/>
             <v-text-field label="Video" v-model="exercise.videoUrl" outlined/>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn :disabled="!validForm" color="primary" @click="$emit('save', exercise);" bottom large>Save</v-btn>
        <v-btn color="primary" @click="$emit('cancel');" bottom large>Cancel</v-btn>
        <v-spacer/>
      </v-card-actions>
      
    </v-card>
  </v-dialog>
</template>


<script>
  export default {
      props: ['dialog', 'cycles'],

      methods:{
        
      },

      data: ()=>({
        validForm: false,

        types: [{name: 'Exercise', value: 'exercise'}, {name: 'Rest', value: 'rest'}],

        exercise: {
          name: 'Jumping frog 2', detail: "Ever felt like a frog? Let it be!",
          type: 'exercise', cycle: 1, repetitions: 2, duration: 1
        },

        rules: {
          name: [ v => !!v || 'Name is required',
            v => (v && v.length < 100) || 'Name must be less than 100 characters'],
          detail: [ v => !!v || 'Detail is required',
            v => (v && v.length < 200) || 'Detail must be less than 200 characters'],
          duration: [ v => !!v || 'Duration is required',
            v => v > 0 || 'Duration must be positive'],
          repetitions: [ v => !!v || 'Repetitions is required', v => v > 0
            || 'Repetitions must be positive'],
          type: [ v => !!v || 'Type is required'],
          cycle: [ v => v!=undefined || 'Cycle is required'],
        },
      })
  }
</script>