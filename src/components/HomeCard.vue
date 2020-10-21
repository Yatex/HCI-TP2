
<template>
    <div>
        <v-card class="mx-auto" max-width="344" height='100%' outlined>
            <v-row align="center"  justify="space-between">
                <v-col cols="2" >
                    <v-card-actions>
                        <v-btn fab dark color="primary black--text" class="accent mx-2">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
                <v-col cols="10" >
                    <v-card-title>{{topLine}}</v-card-title>
                    <v-card-text>{{bottomLine}}</v-card-text>
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


