<template>
    <v-card :max-width="maxWidth">

        <v-img :src="img" height="200px" width="300"/>

        <v-card-title>{{data.name}}</v-card-title>

        <v-card-text>{{data.detail}}</v-card-text>

        <v-card-actions class="justify-space-around">
            <component :is="detailComponent" :data="data" :isRoutine="isRoutine" :own="own"/>
            <div v-if="isRoutine==true && isFavourite==false">
                <v-btn icon @click="favouriteRoutine">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </div>
            <div v-else-if="isRoutine==true && isFavourite==true">
                <v-btn color="red" icon @click="favouriteRoutine">
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
            </div>
            <v-btn v-if="own" icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import {UserApi }from '../api/user.js';
    export default {
        props:['maxWidth', 'data', 'detailComponent', 'own','isRoutine'],
        data: () => ({
            img: require('../assets/gym.jpg')
        }),
        methods:{
        async favouriteRoutine(){
            //console.log("pressed")
                try{

                await UserApi.addFavouriteRoutine(this.data.id,null)
                    
                

                }catch(e){ 
                this.snackbarText = 'Ups! Something went wrong'; 
                this.showSnackbar = true;
                console.log(e);
                }

                this.showOverlay = false;
                this.snackbarText = 'Success!'; 
                this.showSnackbar = true;

            }
        }
    };
</script>