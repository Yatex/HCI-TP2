<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
    <v-card>

      <v-card-title>New Exercise</v-card-title>

      <v-card-text>
        <v-text-field label="Name" v-model="exercise.name" outlined/>

        <v-textarea label="Details" v-model="exercise.detail" outlined/>

        <v-textfield label="Duration" v-model="exercise.duration" outlined/>

        <v-textfield label="Repetitions" v-model="exercise.repetitions" outlined/>

        <v-select label="Type" v-model="exercise.type" outlined :items="types"/>

        <v-select label="Cycle" v-model="exercise.cycle" outlined
          :items="cycles" item-value="name" item-text="name"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="$emit('save', exercise);" bottom large>Save</v-btn>
        <v-spacer/>
      </v-card-actions>
      
    </v-card>
  </v-dialog>
</template>


<script>
  export default {
      props: ['dialog', 'cycles'],

      data: ()=>({
        types: ['exercise', 'rest'],

        exercise: {
          name: 'Jumping frog', description: "Ever felt like a frog? Let it be!",
          type: 'exercise', cycle: '', repetitions: 2, duration: 0
        }
      })
  }
</script>