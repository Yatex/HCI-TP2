<template>
    <v-card :max-width="maxWidth">

        <v-img :src="img" height="200px" width="300"/>

        <v-card-title>{{data.name}}</v-card-title>

        <v-card-text>{{data.detail}}</v-card-text>

        <v-card-actions class="justify-space-around">
            <component :is="detailComponent" :data="data" :own="own"/>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn v-if="own" icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
    export default {
        props:['maxWidth', 'data', 'detailComponent', 'own'],
        data: () => ({
            img: require('../assets/gym.jpg')
        })
    };
</script>