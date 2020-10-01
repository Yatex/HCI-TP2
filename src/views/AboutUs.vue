<template>
  <div class="AboutUs">
    <Navbar />
    <h1>This is the About Us page</h1>
    <v-spacer />
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default {
    components: {
        Navbar,
        Footer
    },
}
</script>