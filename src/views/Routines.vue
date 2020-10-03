<template>
  <div class="Routines">
    <Navbar />
    <h1>This is an Routines page</h1>
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