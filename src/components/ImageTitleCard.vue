<template>
    <v-card :to="card.link">
        <v-img v-bind:src="card.img" class="white--text align-end" height="200px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
            
            <v-card-actions>
                <v-spacer />
                <v-btn text color="primary" class="accent">{{card.title}}</v-btn>
            </v-card-actions>
        </v-img>
    </v-card>
</template>
<script>
export default {
    props:['card']
};
</script> 