<template>
  <v-container fluid>
    <v-card>
      <v-layout row wrap>
        <v-flex sm8>
          <v-card-text>
            <!-- heading -->
            <h1 class="text-sm-center">Login</h1>
            <!-- login form -->
            <v-container>
                  <v-tabs
                    v-model="tabs"
                    fixed-tabs
                    flat
                  >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1" class="primary--text">
                      <p>Admin</p>
                    </v-tab>
          
                    <v-tab href="#mobile-tabs-5-2" class="primary--text">
                      <p>Student</p>
                    </v-tab>
                  </v-tabs>
            </v-container>
          </v-card-text>
        </v-flex>
        <v-flex sm4>
          <v-card-text>Sign up info goes here</v-card-text>
        </v-flex>        
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
  
  export default {
    components: {
      
    }
  }
</script>
