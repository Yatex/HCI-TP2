<template>
    <v-row class="fill-height">

        <v-col cols="12" md="4" class="secondary">
            <v-card-text class="mt-12">
                <h1 class="text-center display-1">Welcome Back!</h1>
                <h4 class="text-center">To keep connected with us please login with your info</h4>
            </v-card-text>

            <div class="text-center">
                <v-btn rounded outlined v-on:click="$emit('go-signin')">SIGN IN</v-btn>
            </div>
        </v-col>

        <v-col cols="12" md="8">
            <v-card-text class="mt-12">

                <h1 class="text-center display-2">Create Account</h1>

                <h4 class="text-center mt-4">Ensure your email for registration</h4>

                <v-form ref="form" v-model="validForm" lazy-validation>
                    <v-text-field label="Username" prepend-icon="person" type="text" color="teal-accent-3"
                        v-model="username" :rules="usernameRules"/>
                    
                    <v-text-field label="Full Name" prepend-icon="person" type="text" color="teal-accent-3"
                        v-model="name" :rules="nameRules"/>

                    <v-text-field label="Email" prepend-icon="email" type="text" color="teal-accent-3"
                         v-model="email"  :rules="emailRules"/>
                    
                    <v-text-field label="Password" prepend-icon="lock" :type="showPass ? 'text' : 'password'" color="teal-accent-3" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                         v-model="password" :rules="passwordRules" @click:append="showPass = !showPass"/>

                    <v-text-field label="Confirm Password" prepend-icon="lock" :type="showConfPass ? 'text' : 'password'" color="teal-accent-3" :append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
                        v-model="confirmPassword" @click:append="showConfPass = !showConfPass"/>

                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px" >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" ></v-text-field>
                        </template>
                        <v-date-picker ref="picker" v-model="date" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="save" ></v-date-picker>
                    </v-menu>
                    
                    <v-select :items="genders" label="Gender" prepend-icon="mdi-gender-male-female" v-model="gender" item-value="value" item-text="text"></v-select>

                </v-form>

                <div class="text-center mt-5">
                    <v-btn rounded :disabled="!validForm" x-large color="primary text-center black--text" class="accent"
                        @click="signUp">SIGN UP</v-btn>
                </div>
            </v-card-text>
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
        name: 'Test User', email: 'test2@test.com',
        password: 'Password1', confirmPassword: 'Password1',
        username: 'Username',
        gender: '',
        genders: [{text:'Male', value:'male'}, {text:'Female', value:'female'}, {text:'Other', value:'other'}],
        date: '',
        menu: false,

        validForm: true,
        showPass: false,
        showConfPass: false,

        showOverlay: false,
        showSnackbar: false,
        snackbarText: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length < 50) || 'Name must be less than 50 characters',
        ],
        nameRules: [
            v => !!v || 'Full name is required',
            v => (v && v.length < 100) || 'Name must be less than 100 characters',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            v => v.length < 100 || 'Email must be less than 100 characters',
        ],
        passwordRules: [
          value => !!value || 'Required.',
          v => v.length < 50 || 'Password must be less than 50 characters',
          v => v.length >= 8 || 'Minimum 8 characters',
        ]
    }),
    watch: {
    menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        }
    },
    methods:{
        save (date) {
            this.$refs.menu.save(date)
        },
        async signUp(){
            if(this.$refs.form.validate()){
                try{

                    this.showOverlay = true;
                    var d = new Date(this.date);
                    await UserApi.signup({
                        "username": this.username,
                        "password": this.password,
                        "fullName": this.name,
                        "gender": this.gender,
                        "birthdate": d.getTime(),
                        "email": this.email,
                    });

                    this.snackbarText = 'Email confirmation sent! Please complete it';

                }catch(e){

                    if(e.code == 2){
                        this.snackbarText = 'This email already exists, please sign in';
                    }else{
                        this.snackbarText = 'Ups! Something went wrong';
                    }

                    console.log(e);

                }

                this.showOverlay = false;
                this.showSnackbar = true;
           }
        }
    }
  }
</script>