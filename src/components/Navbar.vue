<template>
    <v-app-bar app dark color="primary">
        <v-toolbar-title>
            <v-btn width="50" height="50" to="/main">
                <v-img src="../assets/logo.png" width="50"></v-img>
            </v-btn> 
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text to="/main">Home</v-btn>
        <v-btn text to="/my-exercises">My Exercises</v-btn>
        <v-btn text to="/routines/own">My Routines</v-btn>
        <v-btn text to="/favourites">Favourites </v-btn>

        <v-spacer></v-spacer>

        <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on" @click="getUser()">
                <v-avatar color="secondary" size="40">
                    <v-icon dark>
                            mdi-account-circle
                    </v-icon>
                </v-avatar>
                </v-btn>
            </template>

            <v-card>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                        <v-avatar color="secondary">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>

                        <h3 class="mt-2">{{ this.user.fullName }}</h3>

                        <p class="caption mt-1">
                            {{ this.user.email }}
                        </p>

                        <v-divider class="my-3"></v-divider>

                        <v-btn depressed rounded text to="/editprofile">
                            Profile
                        </v-btn>
                        
                        <v-divider class="my-3"></v-divider>
                        
                        <v-btn depressed rounded text to="/aboutus">
                            About Us
                        </v-btn>

                        <v-divider class="my-3"></v-divider>

                        <v-btn depressed rounded text @click="signOut">
                            Sign Out
                        </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
    import {UserApi} from '../api/user';

    export default {
        data: () => ({
            item: 0,
            user: {
                fullName: '',
                email: '',
            },
            items: [
                { text: 'Profile', icon: 'mdi-pencil', to: '/editprofile' },
                { text: 'About Us', icon: 'mdi-information-variant', to: '/aboutus' },
                { text: 'Sign Out', icon: 'mdi-logout-variant', to: '/' }
            ],
        }),
        methods: {
            getUser(){
                UserApi.getUser(null).then(data=>{
                    this.user.fullName=data.fullName;
                    this.user.email=data.email;
            })
            },
            signOut(){
                UserApi.signout();
                this.$router.push('/');

            }
        },
        created() {
            this.getUser();
        }
    }
</script>