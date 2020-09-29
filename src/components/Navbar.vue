<template>
    <div>
            <v-app-bar dark class="grey darken-4">
                <v-toolbar-title>
                    <v-btn text to="/">
                        LOGO
                    </v-btn> 
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn text to="/"> Home </v-btn> |
                <v-btn text to="/exercises"> Exercises </v-btn> |
                <v-btn text to="/routines"> Routines </v-btn> |
                <v-btn text to="/inprogress"> In Progress</v-btn> |
                <v-btn text to="/favourites"> Favourites </v-btn>

                <v-spacer></v-spacer>
        
                <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-menu bottom origin="center center" transition="scale-transition">
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-account-circle</v-icon>
                    </v-btn>
                    </template>
                    <v-list dense nav>
                        <v-list-item-group>
                            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
                                <v-list-group-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-group-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
    item: 0,
    items: [
        { text: 'Edit Profile', icon: 'mdi-pencil', to: '/editprofile' },
        { text: 'Upgrade Membership', icon: 'mdi-arrow-up-bold', to: '/upgrademembership' },
        { text: 'About Us', icon: 'mdi-information-variant', to: '/aboutus' },
        { text: 'Sign Out', icon: 'mdi-logout-variant', to: '/login' }
    ],
    })
}
</script>