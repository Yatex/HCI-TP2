<template>
    <v-card :max-width="maxWidth">

        <div @click="showDetailDialog=true">
            <v-img :src="img" height="200px" width="300"/>

            <v-card-title>{{activity.name}}</v-card-title>

            <v-card-text>{{activity.detail}}</v-card-text>

            <component :is="detailComponent" :data="activity" :own="own" :dialog="showDetailDialog"
                @update="update($event)" @delete="remove($event)" @close="showDetailDialog=false"/>
        </div>

        <v-card-actions class="justify-space-around">

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

        </v-card-actions>

        <v-snackbar v-model="showSnackbar">
            {{ snackbarText }}
        </v-snackbar>

    </v-card>
</template>

<script>
    import Vue from 'vue';
    import {UserApi }from '../api/user.js';

    export default {
        props:['maxWidth', 'data', 'detailComponent', 'own', 'isRoutine'],

        data: function(){
            return {
                showDetailDialog: false,
                showSnackbar: false,
                snackbarText: '',

                activity: Vue.util.extend({}, this.data),
                isFavourite:false,
                totalCount:0,
               
                img: require('../assets/gym.jpg'),          
            }
        },

        methods:{
            update(activity){
                this.activity = activity;
            },

            remove(activity){
                this.$emit('delete', activity);
            },

            async favouriteRoutine(){
                try{

                    this.showOv
                    await UserApi.addFavouriteRoutine(this.activity.id, null);

                }catch(e){
                     
                    if(e.code == 2){
                        this.showSnackbar = true;
                        this.snackbarText = 'Its already a Favourite of yours'; 
                        this.isFavourite=true;
                    }else{
                        this.showSnackbar = true;
                        this.snackbarText = 'Ups! Something went wrong'; 
                    }
                              
                    console.log(e);

                }

                this.isFavourite=true;
            },

            async unfavouriteRoutine(){
                try{

                    await UserApi.removeFavouriteRoutine(this.activity.id,null)    

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

            },

            async checkIfFavourite(){
                await UserApi.getAllFavourites(null,0,10).then(data => {

                    this.activity.totalCount=data.totalCount;

                    while(this.activity.totalCount > 0){
                        data.results.forEach(element => {
                            if(element.id==this.activity.id)
                                this.isFavourite=true;
                        });

                        this.activity.totalCount -= data.results.length;

                        if(this.activity.totalCount>0)
                            UserApi.getAllFavourites(null,0,10).then(data2=>{data=data2});       
                    }

                });
                
            }
        },

        created(){
            this.checkIfFavourite();
        }
    };
</script>