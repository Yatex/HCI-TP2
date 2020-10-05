<template>
    <v-card :max-width="maxWidth">
        <v-img v-bind:src="img"></v-img>
        <v-card-title>{{title}}</v-card-title>
        <v-card-actions>
            <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props:['maxWidth','title','img']
    };
</script>