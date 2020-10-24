<template>
  <div class="Main">

    <Navbar/>
   
    <div id="app">
      <v-app id="inspire">
        <v-container>

          <v-row align="center" justify="space-around" >
            <v-col cols="5">
              <ImageTitleCard :card="{title: 'My Favourites', img:'https://images.pexels.com/photos/256807/pexels-photo-256807.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', link:'/favourites'}"/>
            </v-col>
            <v-col cols="5">
              <ImageTitleCard :card="{title: 'My Profile', img:'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg', link:'/editprofile'}"/>
            </v-col>
          </v-row>

          <v-row justify="space-around">
            <v-col cols="5">
              <ImageTitleCard :card="{title: 'My Exercises', img:'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', link:'/my-exercises'}"/>
            </v-col>
            <v-col cols="5">
              <ImageTitleCard :card="{ title: 'All Routines', img:'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', link:'/routines/all'}"/>
            </v-col>
          </v-row>

        </v-container>
      </v-app>
    </div>

    <Footer/>

  </div>
</template>

<script>

  import Navbar from '../components/Navbar';
  import Footer from '../components/Footer';
  import ImageTitleCard from '../components/ImageTitleCard';

  export default {
    components: {
      Navbar,
      Footer,
      ImageTitleCard
    },
  }

</script>