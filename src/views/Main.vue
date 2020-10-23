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
            </v-col>
            <v-col cols="5" md="4">
              <ImageTitleCard :card="{ title: 'Profile', img:'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg', link:'/editprofile' }"/>
            </v-col>
            <v-row no-gutters>
                <HomeCard topLine='Crear nuevos Ejercicios' bottomLine='Armar instructivos de un ejercicio.'/>
              </v-row>
          </v-row>
          <v-row  justify="space-around">
            <v-col cols="5">
              <ImageTitleCard :card="{ title: 'My Exercises', img:'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', link:'/exercises'}"/>
            </v-col>
            <v-col cols="5">
              <ImageTitleCard :card="{ title: 'All Routines', img:'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', link:'/routines/all'}"/>
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