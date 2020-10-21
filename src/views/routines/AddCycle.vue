<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
    <v-card>

      <v-card-title>New Cycle</v-card-title>

      <v-card-text>
        <v-text-field label="Name" v-model="cycle.name" outlined/>

        <v-select label="Type" :items="types" v-model="cycle.type" outlined/>

        <v-textarea label="Description" v-model="cycle.description" outlined/>

        <v-text-field label="Repetitions" v-model="cycle.repetitions" outlined/>

        <v-text-field label="Order in routine" v-model="cycle.order" outlined/>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="$emit('save', cycle);" bottom large>Save</v-btn>
        <v-spacer/>
      </v-card-actions>
      
    </v-card>

  </v-dialog>
</template>


<script>
  export default {
      props: ['dialog'],

      data: ()=>({
        types: ['warmup', 'exercise', 'cooldown'],

        cycle: {
          name: 'Move The Booty', description: "It's time to shake the ass!", type: 'warmup',
          repetitions: 2, order: 0
        }
      })
  }
</script>