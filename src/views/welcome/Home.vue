<template>
  <v-app>
    <v-main>

      <v-parallax src="../../assets/gym2.jpg" height="800">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window v-model="step" class="dark">

                  <v-window-item :value="1">
                    <Signin v-model="step"/>
                  </v-window-item>

                  <v-window-item :value="2">
                    <Signup/>
                  </v-window-item>

                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
      
    </v-main>
  </v-app>
</template>

<script>
  import Signin from './Signin'
  import Signup from './Signup'

  export default {
    components: {Signin, Signup},
    data: () => ({
      step: 1,
    }),
    props: {
      source: String
    }
  }
</script>