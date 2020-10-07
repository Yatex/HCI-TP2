<template>
    <v-card :max-width="maxWidth">
        <v-img v-bind:src="data.img"></v-img>
        <v-card-title>{{data.title}}</v-card-title>
        <v-card-actions>
            <component :is="detailComponent" :data="data" />
            <v-checkbox v-model="checkbox" label="Add exercise" />
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            checkbox: false,
        }),
        props:['maxWidth', 'data', 'detailComponent']
    };
</script>