<template>
    <v-footer app absolute dark padless>
        <v-card flat tile class="white--text text-center" width="100%">
            <v-card-text>
                <v-btn v-for="link in links" :key="link.id" color="white" text rounded class="my-2" :to="link.to">
                    {{ link.name }}
                </v-btn>
            </v-card-text>
   
            <v-card-text class="white--text pt-0">
                Join the community!
            </v-card-text>
        </v-card>
    </v-footer>
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