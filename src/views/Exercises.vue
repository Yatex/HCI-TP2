<template>
  <div class="Exercises">
    <Navbar />
    <v-container fluid>
      <v-row>
        <v-col v-for="routine in routines" :key="routine.id">
          <ExerciseCard :maxWidth="250"
            :title="routine.title" :img="routine.img"></ExerciseCard>
        </v-col>
      </v-row>
    </v-container>
    <v-pagination v-model="currPage" :length="2"></v-pagination>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ExerciseCard from '../components/ExerciseCard';

export default {
    components: {
        Navbar,
        Footer,
        ExerciseCard
    },
    computed: {
      routines: function(){
        if(this.currPage == 1){
          return [
            {id: 0, title: 'Exercise 1', img: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 1, title: 'Exercise 2', img: 'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg'},
            {id: 2, title: 'Exercise 3', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 3, title: 'Exercise 4', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 4, title: 'Exercise 5', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 5, title: 'Exercise 6', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 6, title: 'Exercise 7', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
          ]
        }else{
          return [
            {id: 7, title: 'Exercise 1', img: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},
            {id: 8, title: 'Exercise 2', img: 'https://images.pexels.com/photos/2294354/pexels-photo-2294354.jpeg?cs=srgb&dl=pexels-li-sun-2294354.jpg&fm=jpg'},
            {id: 9, title: 'Exercise 3', img: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'},];
        }
      }
    },
    data: ()=>({
      currPage: 1
    })
}
</script>