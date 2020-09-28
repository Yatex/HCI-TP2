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
        
                <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
                </v-btn>
            </v-app-bar>
    </div>
</template>

<script>
export default {
    
}
</script>