<template>
  <div class="AboutUs">
    <Navbar />
    <v-container class="my-5">
      <h1>Members:</h1>
      <v-layout row wrap>
        <v-flex v-for="person in team" :key="person.name">
          <v-card max-width="290" class="mt-8">
            <v-img :src="person.img" height="200px" width="300"></v-img>
        
            <v-card-title>
              {{ person.name }}
            </v-card-title>
        
            <v-card-subtitle>
              {{ person.legajo }}
            </v-card-subtitle>

            <v-divider />

            <v-card-subtitle>{{ person.mail }}</v-card-subtitle>
            
          </v-card>
        </v-flex>
      </v-layout>

      <h1 class="mt-8">About Us</h1>

      <h4 class="mt-8"> We are group 6, also known as π. We are students from the ITBA University. Our objective is to create a web page for the subject HCI, Human Computer Interaction.</h4>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';

export default {
    data: () => ({
      team: [
        { //CAMBIEN SUS FOTOS CUANDO PUEDAN
          name: "Ángeles A. Borracci", legajo: "56648", mail: "aborracci@itba.edu.ar", img: require('../assets/blackw.png')
        },
        {
          name: "Felipe Oliver", legajo: "58439", mail: "foliver@itba.edu.ar", img: require('../assets/capamerica.jpeg')
        },
        {
          name: "Matías J. Apablaza", legajo: "59714", mail: "mapablaza@itba.edu.ar", img: require('../assets/hulk.jpg')
        },
        {
          name: "Juan I. Sackmann Sala", legajo: "60340", mail: "jsackmann@itba.edu.ar", img: require('../assets/ironman.jpeg')
        },
      ]
    }),
    components: {
        Navbar,
    },
}
</script>