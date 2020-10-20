<template>
    <v-row>
        
        <v-col cols="12" md="8">
            <v-card-text class="mt-12">
                <h1 class="text-center display-2">Sign in</h1>
                
                <v-form ref="form" :v-model="validForm" lazy-validation>
                    <v-text-field :v-model="email" :rules="emailRules" label="Email"
                         prepend-icon="email" type="text" color="teal-accent-3"/>

                    <v-text-field :v-model="password" :rules="passwordRules" label="Password" 
                        prepend-icon="lock" :type="showPass ? 'text' : 'password'" color="teal-accent-3"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass"/>
                </v-form>

                <v-dialog :v-model="dialog" width="500" overlay-color="white">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="text-decoration-underline text-center mt-3" v-bind="attrs" v-on="on" text>
                            Forgot your password?
                        </v-btn>
                    </template>
            
                    <v-card>
                        <v-card-title class="headline teal darken-1">
                            Forgot your password?
                        </v-card-title>
                
                        <v-card-text>
                            <p>Dont worry. Resetting your password is easy, just tell us the email address you registered with.</p>
                            <v-text-field :v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
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
                <v-btn rounded :disabled="!validForm" x-large class="amber lighten-3 text-center"
                    @click="signIn" to="/main">SIGN IN</v-btn>
            </div>
        </v-col>

        <v-col cols="12" md="4" class="teal darken-1">
            <v-card-text class="mt-12">
                <h1 class="text-center display-1">Hello, Friends!</h1>
                <h4 class="text-center">Enter your personal info and join us!</h4>
            </v-card-text>
            
            <div class="text-center">
                <v-btn rounded outlined>SIGN UP</v-btn>
            </div>
        </v-col>

    </v-row>
</template>


<script>
  export default {
    data: () => ({
        email: '', password: '',

        validForm: true,
        showPass: false,
        dialog: false,

        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          value => !!value || 'Required.'
        ]
    }),

    methods:{
        props:['value'],
        signIn(){
            // if(this.$refs.form.validate()){

            // }
        }
    }
  }
</script>