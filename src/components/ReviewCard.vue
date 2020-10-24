<template>
    <div>
        <v-card class="mx-auto" max-width="450" height='100%' outlined>
            <v-row align="center"  justify="space-between">
                <v-card-text>
                    <v-card-subtitle>Score:</v-card-subtitle>
                    <v-rating v-model="card.rating" readonly :length="length" color="yellow darken-4" background-color="grey darken-4"></v-rating>
                    <v-card-subtitle>Review:</v-card-subtitle>
                    <p class="ml-5">{{ card.review}}</p>
                </v-card-text>
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    data: ()=>({
      rating: 0,
      review: '',
    }),
    props:['card']
};
</script>