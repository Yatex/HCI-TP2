
<template>
    <div>
        <v-card class="mx-auto" max-width="344" outlined>
            <v-row>
                <v-col cols="3" >
                    <v-card-actions>
                        <v-btn class="mx-2" fab dark color="primary" >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
                <v-col cols="9" >
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-3">{{topLine}}</v-list-item-title>
                        <v-list-item-subtitle>{{bottomLine}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-col>
                
            </v-row>
        </v-card>
    </div>
</template>
<script>
export default {
    props:['topLine','bottomLine']
};
</script>


