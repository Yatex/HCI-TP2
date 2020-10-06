<template>
  <div class="Main">
    <Navbar />
   
     <div id="app">
      <v-app id="inspire">
        <v-container class="grey lighten-5">
          <v-row align="center" justify="space-around" >
            <v-col sm="4">
              <v-row no-gutters>
                <HomeCard topLine='Crear rutina de ejercicios' bottomLine='Empezar una nueva rutina.'/>
              </v-row>
              <v-row no-gutters>
                <HomeCard topLine='Crear nuevos Ejercicios' bottomLine='Armar instructivos de un ejercicio.'/>
              </v-row>
            </v-col>
            <v-col cols="5" md="4">
              <ImageTitleCard :card="{ title: 'Testing', img:'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg' }"/>
            </v-col>
            <v-col cols="3" md="4">
              <GraphCardMain :graph="{title:'Graph', visual:'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg'}"/>
            </v-col>
          </v-row>
          <v-row  justify="space-around">
            <v-col cols="5">
              <ImageTitleCard :card="{ title: 'Testing3', img:'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }"/>
            </v-col>
            <v-col cols="5">
              <ImageTitleCard :card="{ title: 'Testing4', img:'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }"/>
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
import GraphCardMain from '../components/GraphCardMain';

export default {
    components: {
        Navbar,
        Footer,
        HomeCard,
        ImageTitleCard,
        GraphCardMain    
},

}
</script>