<template>
    <v-card :max-width="maxWidth" @click="showDetailDialog=true">

        <v-img :src="img" height="200px" width="300"/>

        <v-card-title>{{activity.name}}</v-card-title>

        <v-card-text>{{activity.detail}}</v-card-text>

        <v-card-actions class="justify-space-around">
            
            <component :is="detailComponent" :data="activity" :own="own"
                @update="update($event)" v-model="showDetailDialog"/>

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
    import Vue from 'vue';
    import {UserApi }from '../api/user.js';

    export default {
        props:['maxWidth', 'data', 'detailComponent', 'own', 'isRoutine'],

        data: function(){
            return {
                showDetailDialog: false,
                activity: Vue.util.extend({}, this.data),
                img: require('../assets/gym.jpg'),
                isFavourite:false,
                totalCount:0
            }
        },

        methods:{
            update(activity){
                this.activity = activity;
            },

            async favouriteRoutine(){
                try{

                    await UserApi.addFavouriteRoutine(this.activity.id, null);
                    

                }catch(e){
                     
                    if(e.code == 2){
                        // this.showSnackbar = true;
                        // this.snackbarText = 'Its already a Favourite of yours'; 
                        // this.showSnackbar = true;
                        // console.log('esto 1');
                        this.isFavourite=true;
                    }else{
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
                await UserApi.getAllFavourites(null,0,10).then(data=>
                {
                    this.activity.totalCount=data.totalCount;
                    while( this.activity.totalCount>0){
                        data.results.forEach(element => {
                            if(element.id==this.activity.id){
                                this.isFavourite=true;
                            }
                        });
                        this.activity.totalCount-=data.results.length;
                        if(this.activity.totalCount>0){
                            UserApi.getAllFavourites(null,0,10).then(data2=>{data=data2});
                        }
                    }
                });
                
            }
        },
        created(){
            this.checkIfFavourite();
        }
    };
</script>