<template>
  <div class="EditProfile">
    <Navbar />
      <v-app id="inspire">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <v-card-text>
            <h1 class="text-center display-1">Change Personal Details</h1>
          </v-card-text>
          <v-form ref="form">
            <v-text-field v-model="model" :counter="max" :rules="rules" label="Name"></v-text-field>
        
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

          </v-form>
          <v-btn color="rgb(251,212,109)">
              Save
            </v-btn>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card-text>
            <h1 class="text-center display-1">Change Password</h1> <!-- CREO Q ES MEJOR PONERLO APARTE ESTO PERO QUEDA RE VACIA ESTA PAG, ideas?-->
          </v-card-text>
          <v-form ref="form">
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Old Password" counter @click:append="show1 = !show1"></v-text-field>
        
            <v-text-field v-model="newPassword" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show2 ? 'text' : 'password'" name="input-10-1" label="New Password" hint="At least 8 characters" counter @click:append="show2 = !show2"></v-text-field>

            <v-text-field v-model="cNewPassword" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show3 ? 'text' : 'password'" name="input-10-1" label="Confirm New Password" counter @click:append="show3 = !show3"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn color="rgb(251,212,109)">
              Save
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
export default {
    data: () => ({
      name: '',
      show1: false,      
      show2: false,
      show3: false,
      password: '',
      newPassword: '',
      cNewPassword: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        value => !!value || 'Required.',
        v => v.length >= 8 || 'Min 8 characters',
      ],
    }),
    components: {
        Navbar
    },
}
</script>