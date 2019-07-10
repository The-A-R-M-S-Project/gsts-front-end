<template>
  <v-container text-xs-center fluid fill-height>
    <v-layout align-center justify-center>
        <v-card>
          <v-layout row wrap>
            <v-flex sm5>
              <v-container fill-height pa-0 overlayed>
                <v-layout align-center>
                  <v-flex>
                      <h1>Welcome</h1>
                      <p>To keep track of your report please
                          login with your personal information
                      </p>
                      <v-btn dark round>Sign in</v-btn>
                  </v-flex>
                </v-layout>   
              </v-container>
            </v-flex>
            <v-flex sm7 pa-3>
              <v-card-text>
                <v-container>
                    <h1>Sign Up</h1>
                </v-container>
              </v-card-text>
            </v-flex>     
          </v-layout>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'register'
  }
</script>

