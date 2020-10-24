<template>
  <v-app>

    <Navbar v-if="renderNavbar()"/>

    <v-main>
      <v-container v-if="renderContainer()" fluid>
        <router-view></router-view>
      </v-container>
      <router-view v-else></router-view>
    </v-main>

    <Footer v-if="renderFooter()"/>

  </v-app>
</template>

<script>
  import Navbar from './components/Navbar';
  import Footer from './components/Footer';

  export default {
    name: 'App',

    components: {Navbar, Footer},

    data: () => ({
      noContainer: ['/'],
      noNavbar: ['/'],
      footer: ['/main', '/my-exercises', '/routines/own', '/routines/all', '/favourites'],
    }),

    methods: {
      renderNavbar(){
        return this.noNavbar.findIndex(path => path == this.$router.currentRoute.path) == -1
      },
      renderFooter(){
        return this.footer.findIndex(path => path == this.$router.currentRoute.path) != -1
      },
      renderContainer(){
        return this.noContainer.findIndex(path => path == this.$router.currentRoute.path) == -1
      }
    }
  }
</script>
