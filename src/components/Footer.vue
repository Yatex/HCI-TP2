<template>
    <div id="app">
    <v-app id="inspire">
        <v-footer absolute dark padless>
        <v-card flat tile class="grey darken-4 white--text text-center">
            <v-card-text>
            <v-btn v-for="link in links" :key="link.id" color="white" text rounded class="my-2" :to="link.to">
                {{ link.name }}
            </v-btn>
            </v-card-text>
    
            <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>
    
            <v-card-text class="white--text pt-0">
            Join the community!
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
            <v-row>
            <v-spacer />
            {{ new Date().getFullYear() }} — <strong><v-img src="../assets/logo.png" width="30" height="30" class="ml-2"></v-img>
            </strong>
            <v-spacer />
            </v-row>
            </v-card-text>
        </v-card>
        </v-footer>
    </v-app>
    </div>
</template>

<script>
export default {
    data: () => ({
    links: [
      { id: 0, name: 'About Us', to: "/aboutus"},
      { id: 1, name: 'Team', to: "/aboutus"},
      { id: 2, name: 'Contact Us', to: "/aboutus"}
    ],
    })
}
</script>