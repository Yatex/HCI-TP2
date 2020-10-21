<template>
    <v-card :max-width="maxWidth">
        <v-img v-bind:src="data.img"></v-img>
        <v-card-title>{{data.title}}</v-card-title>
        <v-card-text>{{data.desc}}</v-card-text>
        <v-card-actions class="justify-space-around">
            <component :is="detailComponent" :data="data"/>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        props:['maxWidth', 'data', 'detailComponent']
    };
</script>