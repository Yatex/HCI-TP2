<template>
    <v-card class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px">
        <v-card-title class="justify-center">{{graph.title}}</v-card-title>
        
        <v-card-actions>
            <v-row justify="space-between">
                <v-col cols="4" class="text-center">
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <!-- have to change this  to not use heart-->
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-btn icon>
                        <v-icon>mdi-star</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
       <v-img v-bind:src="graph.visual" ></v-img>
    </v-card>
</template>

<script>
    export default {
        props:['graph']
    };
</script>