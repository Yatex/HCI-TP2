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
            <div v-if="isRoutine==true && isFavourite==true">
                <v-btn color="red" icon @click="unfavouriteRoutine">
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
            img: require('../assets/gym.jpg'),
            isFavourite:false
        }),
        methods:{
        async favouriteRoutine(){
                try{

                await UserApi.addFavouriteRoutine(this.data.id,null)
                    
                

                }catch(e){
                     
                    if(e.code == 2){
                        // this.showSnackbar = true;
                        // this.snackbarText = 'Its already a Favourite of yours'; 
                        // this.showSnackbar = true;
                        // console.log('esto 1');
                        this.isFavourite=true;
                    }
                    else{
                        // this.showSnackbar = true;
                        // this.snackbarText = 'Ups! Something went wrong'; 
                        // this.showSnackbar = true;
                        // console.log('esto 2');
                    }
                
               
                console.log(e);
                }
                this.isFavourite=true;
                // this.showOverlay = false;
                // this.snackbarText = 'Success!'; 
                // this.showSnackbar = true;

            },
            async unfavouriteRoutine(){
                try{

                await UserApi.removeFavouriteRoutine(this.data.id,null)
                    
                

                }catch(e){
                     
                    if(e.code == 2){
                        // this.showSnackbar = true;
                        // this.snackbarText = 'Its already a Favourite of yours'; 
                        // this.showSnackbar = true;
                        // console.log('esto 1');
                        this.isFavourite=true;
                    }
                    else{
                        // this.showSnackbar = true;
                        // this.snackbarText = 'Ups! Something went wrong'; 
                        // this.showSnackbar = true;
                        // console.log('esto 2');
                    }
                
               
                console.log(e);
                }
                this.isFavourite=false;
                // this.showOverlay = false;
                // this.snackbarText = 'Success!'; 
                // this.showSnackbar = true;

            }
        }
    };
</script>