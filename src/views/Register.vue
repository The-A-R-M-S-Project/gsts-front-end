<template>
  <v-container text-xs-center fluid fill-height>
    <v-layout align-center justify-center>
        <v-card min-width="90%">
          <v-layout row wrap>
            <v-flex sm5>
              <v-container fill-height pa-0 overlayed>
                <v-layout align-center>
                  <v-flex>
                      <h1 class="display-3 font-weight-light">Welcome</h1>
                      <p>To keep track of your report please
                          login with your personal information
                      </p>
                      <v-btn dark round large to="/">login</v-btn>
                  </v-flex>
                </v-layout>   
              </v-container>
            </v-flex>
            <v-flex sm7>
                <v-container>
                    <v-form v-model="valid">
                        <v-container class="container">
                            <h2 class="headline text-md-left">Register</h2>
                            <v-layout>
                                <v-flex>
                                    <v-text-field
                                        v-model="firstname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="First name"
                                        required
                                        prepend-inner-icon="person"
                                        height="28"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex>
                                    <v-text-field
                                        v-model="lastname"
                                        :rules="nameRules"
                                        :counter="10"
                                        label="Last name"
                                        required
                                        prepend-inner-icon="person"
                                        height="28"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-text-field
                                v-model="firstname"
                                label="Registration Number"
                                required
                                prepend-inner-icon="person"
                                height="28"
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="College Email"
                                required
                                prepend-inner-icon="person"
                                height="28"
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="Username/Email"
                                required
                                prepend-inner-icon="person"
                                height="28"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                required
                                type="password"
                                prepend-inner-icon="lock"
                                height="28"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Confirm Password"
                                required
                                type="password"
                                prepend-inner-icon="lock"
                                height="28"
                            ></v-text-field>
                            <div class="text-md-left">
                                <v-btn light large round depressed ripple class="yellow accent-1">
                                    <v-icon>person_add</v-icon>
                                    <span>&nbsp;Register</span>
                                </v-btn>
                            </div>                            
                        </v-container>
                    </v-form>
                </v-container>
            </v-flex>     
          </v-layout>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'register',
    data() {
        return {
            firstname: '',
            lastname: '',
            password: '',
            email: ''
        }
    }
  }
</script>
<style lang="scss">
    input:focus{
    outline: 2px solid orange; 
    }
</style>

