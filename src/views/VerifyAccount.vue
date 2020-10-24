<template>
 <v-app>
    <v-main>
        <v-row>
 
                <v-container class="fill-height" fluid src="../assets/gym2.jpg">
                    <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                    <v-window class="dark">
                        <v-row align="center" justify="center">
                            
                            <v-col cols="12" md="8">
                                <v-card-text class="mt-12">
                                    <h1 class="text-center display-2">Almost There</h1>
                                    <v-form ref="form" v-model="validForm" lazy-validation>
                                        <v-text-field v-model="email" label="email" prepend-icon="mdi-account" type="text" color="teal-accent-3"/>
                                        <v-text-field v-model="code" :rules="codeRules" label="code" prepend-icon="lock" color="teal-accent-3"/>
                                    </v-form>
                                    <div class="text-center mt-3">
                                        <v-btn rounded :disabled="!validForm" x-large color="primary text-center black--text" class="accent"
                                            @click="verifyEmail">Verify Account</v-btn>
                                    </div>
                                </v-card-text>
                            </v-col>
                    
                            
                            <v-overlay :value="showOverlay">
                                <v-progress-circular indeterminate size="64"/>
                            </v-overlay>

                            <v-snackbar v-model="showSnackbar">
                                {{ snackbarText }}
                            </v-snackbar>
                                
                        </v-row >
                    </v-window>
                    </v-card >
                    
                </v-col>
              </v-row >
                </v-container>
            
        </v-row>
    </v-main>
  </v-app>
</template>


<script>
  import {UserApi} from '../api/user'

  export default {
    data: () => ({
        code:'',
        email:'example@email.com',
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
        codeRules: [
          value => !!value || 'Code is Required.'
        ]
    }),

    methods:{
        checkParameters(){
            this.email=this.$route.query.email;
            this.code=this.$route.query.code;
        },
        async verifyEmail(){
            try{
                return await UserApi.verifyEmail({
                    "email":this.email,
                    "code":this.code
                },null);
            }catch(e){
                    
                this.showSnackbar = true;
                this.snackbarText = 'Ups! Something went wrong'; 
                this.showSnackbar = true;
                console.log(e);
                    
            }finally{
                if(!this.showSnackbar){
                    this.showOverlay = false;
                    this.snackbarText = 'Success!'; 
                    this.showSnackbar = true;
                    this.$router.push('/');
                }            
            
            }
        }
    },
    created(){
        this.checkParameters();
    }
}
</script>