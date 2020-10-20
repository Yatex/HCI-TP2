<template>
    <v-row class="fill-height">

        <v-col cols="12" md="4" class="teal darken-1">
            <v-card-text class="mt-12">
                <h1 class="text-center display-1">Welcome Back!</h1>
                <h4 class="text-center">To keep connected with us please login with your info</h4>
            </v-card-text>

            <div class="text-center">
                <v-btn rounded outlined @click="step--">SIGN IN</v-btn>
            </div>
        </v-col>

        <v-col cols="12" md="8">
            <v-card-text class="mt-12">

                <h1 class="text-center display-2">Create Account</h1>

                <h4 class="text-center mt-4">Ensure your email for registration</h4>

                <v-form ref="form" v-model="validForm" lazy-validation>
                    <v-text-field label="Name" prepend-icon="person" type="text" color="teal-accent-3"
                        :v-model="name" :rules="nameRules"/>

                    <v-text-field label="Email" prepend-icon="email" type="text" color="teal-accent-3"
                         :v-model="email"  :rules="emailRules"/>

                    <v-text-field label="Password" prepend-icon="lock" :type="showPass ? 'text' : 'password'" color="teal-accent-3" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                         :v-model="newPassword" :rules="passwordRules" @click:append="showPass = !showPass"/>

                    <v-text-field label="Confirm Password" prepend-icon="lock" :type="showConfPass ? 'text' : 'password'" color="teal-accent-3" :append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
                        :v-model="confirmNewPassword" :rules="confirmPasswordRules" @click:append="showConfPass = !showConfPass"/>
                </v-form>

                <div class="text-center mt-5">
                    <v-btn rounded :disabled="!validForm" x-large color="amber lighten-3 text-center" class="mr-4"
                        to="/main">SIGN UP</v-btn>
                </div>
            </v-card-text>
        </v-col>

    </v-row>
</template>


<script>
//   import {UserApi} from '../../api/user'

  export default {
    data: () => ({
        email: '', password: '',

        validForm: true,
        showPass: false,
        showConfPass: false,

        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length < 15) || 'Name must be less than 15 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          value => !!value || 'Required.',
          v => v.length >= 8 || 'Min 8 characters',
        ] 
    }),

    methods:{
        signUp(){
            // if(this.$refs.form.validate()){

            // }
        }
    }
  }
</script>