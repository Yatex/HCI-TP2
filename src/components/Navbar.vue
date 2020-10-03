<template>
    <div>
            <v-app-bar fixed app dark class="grey darken-4">
                <v-toolbar-title>
                    <v-btn x-large text to="/main" color="rgb(79,138,139)">
                        LOGO
                    </v-btn> 
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn text to="/main"> Home </v-btn> | <!-- Aca confunde pero Home vendria a ser la view Main!!!!! -->
                <v-btn text to="/exercises"> Exercises </v-btn> |
                <v-btn text to="/routines"> Routines </v-btn> |
                <v-btn text to="/inprogress"> In Progress</v-btn> | <!-- Esto no es necesario, propongo sacarlo y si sobra tiempo meterlo -->
                <v-btn text to="/favourites"> Favourites </v-btn>

                <v-spacer></v-spacer>
        
                <v-btn icon color="rgb(79,138,139)">
                <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-menu bottom min-width="200px" rounded offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn icon x-large v-on="on">
                        <v-avatar color="rgb(79,138,139)" size="40">
                            <span class="white--text headline">{{ user.initials }}</span>
                        </v-avatar>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                            <v-avatar
                            color="rgb(79,138,139)"
                            >
                            <span class="white--text headline">{{ user.initials }}</span>
                            </v-avatar>
                            <h3>{{ user.fullName }}</h3>
                            <p class="caption mt-1">
                            {{ user.email }}
                            </p>
                            <v-divider class="my-3"></v-divider>
                            <v-btn depressed rounded text to="/editprofile">
                            Edit Profile
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn depressed rounded text to="/aboutus">
                            About Us
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn depressed rounded text to="/">
                            Sign Out
                            </v-btn>
                        </div>
                        </v-list-item-content>
                    </v-card>
                    </v-menu>
            </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
    item: 0,
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
    },
    items: [
        { text: 'Edit Profile', icon: 'mdi-pencil', to: '/editprofile' },
        { text: 'About Us', icon: 'mdi-information-variant', to: '/aboutus' },
        { text: 'Sign Out', icon: 'mdi-logout-variant', to: '/' }
    ],
    })
}
</script>