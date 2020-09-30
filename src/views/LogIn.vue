<template>
  <div class="LogIn">
    <v-card class="mx-auto my-12" max-width="600">
      <v-card-title dark class="grey lighten-1">Log In</v-card-title>
      <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" counter @click:append="show1 = !show1"></v-text-field>
      <v-btn :disabled="!valid" x-large color="yellow darken-1 text-center" class="mr-4" @click="validate" to="/">
        Log In
      </v-btn>

    </v-form>
    </v-card-text>
    <v-card-actions>
        <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="text-decoration-underline" v-bind="attrs" v-on="on">
            Forgot your password?
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline grey lighten-2 text-end">
            Forgot your password?
          </v-card-title>
  
          <v-card-text>
            <p>Dont worry. Resetting your password is easy, just tell us the email address you registered with.</p>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-btn color="grey lighten-1" class="mr-4" @click="dialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="yellow darken-1" class="mr-4" @click="dialog = false">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer />
      <v-dialog v-model="dialog2" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="text-decoration-underline" v-bind="attrs" v-on="on">
            You don't have an account? Sign in!
          </v-btn>
        </template>
  
        <v-card>
          <v-card-title class="headline grey lighten-2 text-end">
            Sign In
          </v-card-title>
  
          <v-card-text>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-btn color="grey lighten-1" class="mr-4" @click="dialog2 = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="yellow darken-1" class="mr-4" @click="dialog2 = false">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    dialog: false,
    dialog2: false,
    show1: false,
    email: '',
    passwordRules: [
        value => !!value || 'Required.',
        v => v.length >= 8 || 'Min 8 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
  }
}
</script>

<style>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_1280.jpg') no-repeat center center;
    transform: scale(1.1);
  }
</style>