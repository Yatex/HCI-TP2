<template>
  <div class="Main">
    <Navbar />
   
     <div id="app">
      <v-app id="inspire">
        <v-container class="grey lighten-5">
          <v-row>
            <v-col sm="4">
              <v-row no-gutters>
                <HomeCard topLine='Crear rutina de ejercicios' bottomLine='Empezar una nueva rutina.'/>
              </v-row>
              <v-row no-gutters>
                <HomeCard topLine='Crear nuevos Ejercicios' bottomLine='Armar instructivos de un ejercicio.'/>
              </v-row>
            </v-col>
            <v-col cols="12" md="4">
              <ImageTitleCard :card= "{ title: 'Testing', src: '../assets/capamerica.jpg' }"/>
            </v-col>
            <v-col cols="6" md="4">
              <ImageTitleCard :card= "{  src: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',title: 'Testing2' }"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <ImageTitleCard :card= "{ title: 'Testing3', src: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }"/>
            </v-col>
            <v-col cols="6">
              <ImageTitleCard :card= "{ title: 'Testing4', src: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }"/>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </div>
    <Footer />
  </div>
  
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomeCard from '../components/HomeCard';
import ImageTitleCard from '../components/ImageTitleCard';

export default {
    components: {
        Navbar,
        Footer,
        HomeCard,
        ImageTitleCard    
},

}
</script>