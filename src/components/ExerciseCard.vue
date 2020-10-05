<template>
    <v-card :max-width="maxWidth">
        <v-img v-bind:src="exercise.img"></v-img>
        <v-card-title>{{exercise.title}}</v-card-title>
        <v-card-text>{{exercise.desc}}</v-card-text>
        <v-card-actions>
            <ExerciseDetail :exercise="exercise"/>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import ExerciseDetail from '../views/ExerciseDetail';

    export default {
        components: { ExerciseDetail },
        props:['maxWidth','exercise']
    };
</script>