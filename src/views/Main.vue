<template>
  <div class="Main">
    <Navbar />
    <h1>This is the Main page</h1>
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
              <ImageTitleCard />
            </v-col>
            <v-col
              cols="6"
              md="4"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
                .col-6 .col-md-4
              </v-card>
            </v-col>
          </v-row>
      
        
          
          <!-- Columns are always 50% wide, on mobile and desktop -->
          <v-row>
            <v-col
              v-for="n in 2"
              :key="n"
              cols="6"
            >
              <v-card
                class="pa-2"
                outlined
                tile
              >
                .col-6
              </v-card>
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

export default {
    components: {
        Navbar,
        Footer,
        HomeCard    
},
cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' }
    ],
}
</script>