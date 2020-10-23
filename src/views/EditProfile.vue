<template>
  <div class="EditProfile">
    <Navbar />
    <v-app id="editprofile">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card-text>
            <h1 class="text-center display-1">Change Personal Details</h1>
          </v-card-text>
          <v-form ref="form">
<!--             
            <v-text-field v-model="model" :counter="max" :rules="rules" label="Name"></v-text-field>
        
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->
            <v-text-field label="Username" prepend-icon="person" type="text" color="teal-accent-3"
                        v-model="username" :rules="usernameRules" :readonly="rdonly"/>
                    
            <v-text-field label="Full Name" prepend-icon="person" type="text" color="teal-accent-3"
                v-model="name" :rules="nameRules" :readonly="rdonly"/>

            <v-text-field label="Email" prepend-icon="email" type="text" color="teal-accent-3"
                  v-model="email"  :rules="emailRules" :readonly="rdonly"/>

            <v-text-field label="PhoneNumber" prepend-icon="mdi-phone" type="text" color="teal-accent-3"
                v-model="phone"  :rules="PhoneRules" :readonly="rdonly"/>

            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px" >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" :readonly="rdonly" v-bind="attrs" v-on="on" ></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="date" max="2030-01-01" min="1950-01-01" @change="save" ></v-date-picker>
            </v-menu>
            
            <v-select :items="genders" label="Gender" prepend-icon="mdi-gender-male-female" v-model="gender" item-value="value" item-text="text" :readonly="rdonly"></v-select>
          </v-form>
          <div v-if="rdonly">
            <v-btn x-large color="accent" @click="enableEdit">
                Edit
            </v-btn>
          </div>
          <div v-else>
            <v-btn x-large color="accent" @click="saveChanges">
                Save
            </v-btn>
            <v-btn x-large color="grey lighten-1" @click="Cancel">
                Cancel
            </v-btn>
          </div>
          <v-overlay :value="showOverlay">
            <v-progress-circular indeterminate size="64"/>
          </v-overlay>

          <v-snackbar v-model="showSnackbar">
              {{ snackbarText }}
          </v-snackbar>
        </v-col>
<!-- CREO Q ES MEJOR PONERLO APARTE ESTO PERO QUEDA RE VACIA ESTA PAG, ideas?-->
        <!-- <v-col cols="12" md="6">
          <v-card-text>
            <h1 class="text-center display-1">Change Password</h1> 
          </v-card-text>
          <v-form ref="form">
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Old Password" counter @click:append="show1 = !show1"></v-text-field>
        
            <v-text-field v-model="newPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show2 ? 'text' : 'password'" name="input-10-1" label="New Password" hint="At least 8 characters" counter @click:append="show2 = !show2"></v-text-field>

            <v-text-field v-model="cNewPassword" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show3 ? 'text' : 'password'" name="input-10-1" label="Confirm New Password" counter @click:append="show3 = !show3"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn color="accent"  >
              Save
            </v-btn>
          </v-card-actions>
        </v-col> -->
      </v-row>
    </v-container>
    <div v-if="this.delete==1"> 
      <v-btn x-large block color="red darken-1" @click="Deletion_sequence">
        Delete User ?
      </v-btn>
    </div>
    <div v-if="this.delete==0">
      <v-btn x-large block color="red darken-1" @click="Delete">
       Press again to Delete User PERMANENTLY
      </v-btn>
    </div>

  </v-app>
  </div>
</template>




<script>
import Navbar from '../components/Navbar';
import {UserApi} from '../api/user';
export default {
  data:()=>({
        delete:1,
        name: '',
        email: '',
        password: '', 
        confirmPassword: '',
        username: '',
        gender: '',
        phone:'', //falta phone rules
        genders: [{text:'Male', value:'male'}, {text:'Female', value:'female'}, {text:'Other', value:'other'}],
        date: '',
        menu: false,

        rdonly:true,
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
        PhoneRules: [
            v => /^[0-9]+$/.test(v) || 'Phone must be valid',
            v => (v && v.length >= 8) || 'Phone number must be greater than 8 characters',
            v => (v && v.length < 15) || 'Phone number must be less than 15 characters',
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
        ]}),
   
    methods:{
        save (date) {
            this.$refs.menu.save(date)
        },
        enableEdit(){
          this.rdonly=false;
        },
        disableEdit(){
           this.rdonly=true;
        },
        getUser(){
          UserApi.getUser(null).then(data=>{
            this.username=data.username;
            this.password=data.password;
            this.name=data.fullName;
            this.gender=data.gender;
            this.date=data.birthdate;
            this.email=data.email;
            this.phone=data.phone;
          })
        },
        Cancel(){
            this.getUser();
            this.disableEdit();
        },
        saveChanges(){
          this.upload();
          this.disableEdit();
        },
        async upload(){
        
        this.showOverlay = true;

        try{

         await UserApi.modify({
            username: this.username,
            fullName: this.name,
            gender: this.gender,
            birthdate: this.date,
            email: this.email,
            phone: this.phone,
            avatarUrl: "https://flic.kr/p/3ntH2u" //lo dejo fijo
         },null)
            
          

        }catch(e){
          this.snackbarText = 'Ups! Something went wrong'; 
          this.showSnackbar = true;
          console.log(e);
        }

        this.showOverlay = false;
        this.snackbarText = 'Success!'; 
        this.showSnackbar = true;

      },
      async Delete(){
        this.showOverlay = true;

        try{

         await UserApi.delete(null);
            
        }catch(e){
          this.snackbarText = 'Ups! Something went wrong'; 
          this.showSnackbar = true;
          console.log(e);
        }

        this.showOverlay = false;
        this.snackbarText = 'Success!'; 
        this.showSnackbar = true;

      },
      Deletion_sequence(){
        this.delete--;
      }

        
        
    },
    components: {
        Navbar
    },
    created(){
        this.getUser();
    }
  
    //data: () => ({
    //   name: '',
    //   show1: false,      
    //   show2: false,
    //   show3: false,
    //   password: '',
    //   newPassword: '',
    //   cNewPassword: '',
    //   nameRules: [
    //     v => !!v || 'Name is required',
    //     v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    //   ],
    //   email: '',
    //   emailRules: [
    //     v => !!v || 'E-mail is required',
    //     v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    //   ],
    //   passwordRules: [
    //     value => !!value || 'Required.',
    //     v => v.length >= 8 || 'Min 8 characters',
    //   ],
    // }),
    
}
</script>