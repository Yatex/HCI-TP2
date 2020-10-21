<template>
    <v-row>
        
        <v-col cols="12" md="8">
            <v-card-text class="mt-12">
                <h1 class="text-center display-2">Sign in</h1>
                
                <v-form ref="form" v-model="validForm" lazy-validation>
                    <v-text-field v-model="email" :rules="emailRules" label="Email"
                         prepend-icon="email" type="text" color="teal-accent-3"/>

                    <v-text-field v-model="password" :rules="passwordRules" label="Password" 
                        prepend-icon="lock" :type="showPass ? 'text' : 'password'" color="teal-accent-3"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass"/>
                </v-form>

                <v-dialog v-model="dialog" width="500" overlay-color="white">
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
                <v-btn rounded :disabled="!validForm" x-large class="amber lighten-3 text-center"
                    @click="signIn">SIGN IN</v-btn>
            </div>
        </v-col>

        <v-col cols="12" md="4" class="teal darken-1">
            <v-card-text class="mt-12">
                <h1 class="text-center display-1">Hello, Friends!</h1>
                <h4 class="text-center">Enter your personal info and join us!</h4>
            </v-card-text>
            
            <div class="text-center">
                <v-btn rounded outlined v-on:click="$emit('go-signup')">SIGN UP</v-btn>
            </div>
        </v-col>

        <v-overlay :value="showOverlay">
            <v-progress-circular indeterminate size="64"/>
        </v-overlay>

        <v-snackbar v-model="showSnackbar">
            {{ snackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn v-if="snackbarShowResend" color="pink" text v-bind="attrs" @click="resendVerifyEmail">
                    Resend email
                </v-btn>
            </template>
        </v-snackbar>

    </v-row>
</template>


<script>
  import {UserApi} from '../../api/user'

  export default {
    data: () => ({
        email: 'test@test.com', password: 'Password1',

        validForm: true,
        showPass: false,
        dialog: false,

        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',
        snackbarShowResend: false,

        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          value => !!value || 'Required.'
        ]
    }),

    methods:{
        async signIn(){
            if(this.$refs.form.validate()){
                try{

                    this.showOverlay = true;

                    await UserApi.signin({
                        "username": this.email,
                        "password": this.password
                    });

                    this.$router.push('/main');

                }catch(e){

                    if(e.code == 4){
                        this.snackbarText = 'Wrong username or password';
                    }else if(e.code == 8){
                        this.snackbarText = 'You have to verify your email first';
                        this.snackbarShowResend = true;
                    }else{
                        this.snackbarText = 'Ups! Something went wrong';
                    }

                    this.showSnackbar = true;

                    console.log(e);

                }

                this.showOverlay = false;
            }
        },

        async resendVerifyEmail(){
            UserApi.resendVerifyEmail({
                "email": this.email
            });

            this.snackbarText = 'Email sent!'
            this.snackbarShowResend = false;

            this.showSnackbar = true;
        }
    },

    beforeCreate(){

        if(UserApi.isAuthenticated)
            this.$router.push('/main');

    }
  }
</script>