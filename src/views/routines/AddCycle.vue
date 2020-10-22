<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" persistent>
    <v-card>

      <v-card-title>New Cycle</v-card-title>

      <v-card-text>
        <v-form v-model="validForm">
          <v-text-field label="Name" v-model="cycle.name"
            :rules="rules.name" outlined/>

          <v-select label="Type" :items="types" v-model="cycle.type"
            :rules="rules.type" item-text="name" item-value="value" outlined/>

          <v-textarea label="detail" v-model="cycle.detail"
            :rules="rules.detail" outlined/>

          <v-text-field label="Repetitions" v-model="cycle.repetitions"
            :rules="rules.repetitions" type="numeric" outlined/>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn :disabled="!validForm" color="primary" @click="$emit('save', cycle);" bottom large>Save</v-btn>
        <v-btn color="primary" @click="$emit('cancel');" bottom large>Cancel</v-btn>
        <v-spacer/>
      </v-card-actions>
      
    </v-card>

  </v-dialog>
</template>


<script>
  export default {
      props: ['dialog'],

      data: ()=>({
        validForm: false,

        types: [
          {name: 'Warm up', value: 'warmup'}, {name: 'Exercise', value: 'exercise'}, {name: 'Cool down', value: 'cooldown'}
        ],

        cycle: {
          name: 'Shake The Booty 2', detail: "It's time to shake the ass!", type: 'warmup', repetitions: 2
        },

        rules: {
          name: [ v => !!v || 'Name is required',
            v => (v && v.length < 100) || 'Name must be less than 100 characters'],
          detail: [ v => !!v || 'Detail is required',
            v => (v && v.length < 200) || 'Detail must be less than 200 characters'],
          repetitions: [ v => !!v || 'Repetitions is required',
            v => v > 0 || 'Repetitions must be positive'],
          type: [ v => !!v || 'Type is required'],
        },
      })
  }
</script>