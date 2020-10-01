<template>
  <v-app>
    <v-content>
      <v-parallax src="../assets/gym2.jpg" height="800">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step" class="dark">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2">Sign in</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                          <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        </div>
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field id="email" :rules="emailRules" label="Email" name="Email" prepend-icon="email" type="text" color="teal-accent-3"></v-text-field>
                            <v-text-field id="password" :rules="passwordRules" label="Password" name="Password" prepend-icon="lock" type="password" color="teal-accent-3"></v-text-field>
                          </v-form>
                          <v-dialog v-model="dialog" width="500">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="text-decoration-underline text-center mt-3" v-bind="attrs" v-on="on" text>
                                Forgot your password?
                              </v-btn>
                            </template>
                      
                            <v-card>
                              <v-card-title class="headline yellow darken-1 text-end">
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
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded :disabled="!valid" x-large class="amber lighten-3 text-center" @click="validate" to="/main">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal darken-1">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-1">Hello, Friends!</h1>
                        <h4 class="text-center">Enter your personnel details and join us!</h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal darken-1">
                    <v-card-text class="mt-12">
                      <h1 class="text-center display-1">Welcome Back!</h1>
                      <h4 class="text-center">To keep connected with us please login with your personnel info</h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn rounded outlined @click="step--">SIGN IN</v-btn>
                    </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                       <h1 class="text-center display-2">Create Account</h1>
                       <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                       </div>
                       <h4 class="text-center mt-4">Ensure your email for registration</h4>
                       <v-form ref="form2" v-model="valid2" lazy-validation>
                            <v-text-field id="name" label="Name" name="Name" :rules="nameRules" prepend-icon="person" type="text" color="teal-accent-3"></v-text-field>
                            <v-text-field id="email" :rules="emailRules" label="Email" name="Email" prepend-icon="email" type="text" color="teal-accent-3"></v-text-field>
                            <v-text-field id="password" v-model="password" :rules="passwordRules" label="Password" name="Password" prepend-icon="lock" type="password" color="teal-accent-3"></v-text-field>
                            <v-text-field label="Confirm Password" v-model="password2" :rules="cPasswordRules" name="CPassword" prepend-icon="lock" type="password" color="teal-accent-3"></v-text-field>
                          </v-form>
                          <div class="text-center mt-5">
                            <v-btn rounded :disabled="!valid2" x-large color="amber lighten-3 text-center" class="mr-4" @click="validate2" to="/main">SIGN UP</v-btn>
                          </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </v-parallax>
    </v-content>
  </v-app>
</template>

<script>
// @ is an alias to /src
export default {
  data: () => ({
    step: 1 ,
    valid: true,
    valid2: true,
    name: '',
    password: '',
    password2: '',
    dialog: false,
    dialog2: false,
    show1: false,
    email: '',
    passwordRules: [
        value => !!value || 'Required.',
        v => v.length >= 8 || 'Min 8 characters',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length < 15) || 'Name must be less than 15 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    cPasswordRules: [
      v => !!v || 'Confirmation is Required',
      v => (v && v === this.password) || 'It must be the same as the password above.',
    ]
  }),
  props: {
    source: String
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    validate2 () {
      this.$refs.form2.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
  }
}
</script>