<template>
    <v-row>
        
        <v-col cols="12" md="8">
            <v-card-text class="mt-12">
                <h1 class="text-center display-2">Sign in</h1>
                
                <v-form ref="form" v-model="validForm" lazy-validation>
                    <v-text-field v-model="username" label="Username"
                         prepend-icon="mdi-account" type="text" color="teal-accent-3"/>

                    <v-text-field v-model="password" :rules="passwordRules" label="Password" 
                        prepend-icon="lock" :type="showPass ? 'text' : 'password'" color="teal-accent-3"
                        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass"/>
                </v-form>

                <v-dialog v-model="dialog" width="500" overlay-color="white">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="text-decoration-underline text-center mt-3" v-bind="attrs" v-on="on" text>
                            Resend verification?
                        </v-btn>
                    </template>
            
                    <v-card>
                        <v-card-title class="headline teal darken-1">
                            Resend verification
                        </v-card-title>
                
                        <v-card-text>
                            <p>Dont worry. You will be enjoying our service in a couple of minutes!</p>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-card-text>
                
                        <v-divider></v-divider>
                
                        <v-card-actions>
                            <v-btn color="grey lighten-1" class="mr-4" @click="dialog = false">
                                Cancel
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="yellow darken-1" class="mr-4" @click="resendVerifyEmail()">
                                Send
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-text>

                    <v-dialog v-model="dialogVE" max-width="290" >
                        <v-card>
                        <v-card-title class="headline">
                            Verify your email
                        </v-card-title>
                        <v-card-subtitle class="mt-1">
                            Check your email
                        </v-card-subtitle>
                
                        <v-card-text>
                            <v-text-field label="Enter Code" type="text" color="teal-accent-3" v-model="this.code"/>
                        </v-card-text>
                
                        <v-card-actions>
                            <v-btn color="grey lighten-1" text @click="dialogVE = false" >
                            Cancel
                            </v-btn>

                            <v-spacer />

                            <v-btn color="primary text-center black--text" class="accent" text @click="verifyEmail()" >
                            Verify
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>


            <div class="text-center mt-3">
                <v-btn rounded :disabled="!validForm" x-large color="primary text-center black--text" class="accent"
                    @click="signIn">SIGN IN</v-btn>
            </div>
        </v-col>

        <v-col cols="12" md="4" class="secondary">
            <v-card-text class="mt-12">
                <h1 class="text-center display-1">Hello, Friends!</h1>
                <h4 class="text-center">Enter your personal info and join us!</h4>
            </v-card-text>
            
            <div class="text-center">
                <v-btn rounded outlined v-on:click="$emit('go-signup')">SIGN UP</v-btn>
            </div>
            <v-row>
                <v-spacer />
                    <v-img src="../../assets/logo.png" width="100" class="mt-2"></v-img>
                <v-spacer />
            </v-row>
        </v-col>

        <v-overlay :value="showOverlay">
            <v-progress-circular indeterminate size="64"/>
        </v-overlay>

        <v-snackbar v-model="showSnackbar">
            {{ snackbarText }}
        </v-snackbar>

    </v-row>
</template>


<script>
  import {UserApi} from '../../api/user'

  export default {
    data: () => ({
        password: 'Password1',
        username: 'username',
        email:'example@email.com',
        validForm: true,
        showPass: false,
        dialog: false,
        dialogVE: false,
        code: '',

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
                        "username": this.username,
                        "password": this.password
                    });

                    this.$router.push('/main');

                }catch(e){

                    if(e.code == 4){
                        this.snackbarText = 'Wrong username or password';
                    }else if(e.code == 8){
                        this.snackbarText = 'You have to verify your email first. If you did not recieve an email, go to Resend Verification';
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
        async verifyEmail(){
            try{
                this.showOverlay = true;
                await UserApi.verifyEmail({
                    "email": this.email,
                    "code": this.code,
                });
                this.dialogVE = false;
                this.snackbarText = 'Email verified! Welcome!';
            }catch(e){
                this.snackbarText = 'Ups! Something went wrong with the verification';
            }
            this.showOverlay = false;
            this.showSnackbar = true;
        },
        async resendVerifyEmail(){
            try{
            UserApi.resendVerifyEmail({
                "email": this.email
            });

            this.snackbarText = 'Email sent!'
            this.snackbarShowResend = false;
            }catch(e){
                if(e.code == 3)
                    this.snackbarText = 'That email is unregistered, please sign up';
                else
                    this.snackbarText = 'Ups! Something went wrong';
            }
            this.showSnackbar = true;
            this.dialog = false;
            this.dialogVE = true;
        }
    },

    beforeCreate(){

        if(UserApi.isAuthenticated)
            this.$router.push('/main');

    }
  }
</script>