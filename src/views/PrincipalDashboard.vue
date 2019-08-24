<template>
    <div style="height: 100vh;">
        <Navigation/>
        <v-container fill-height >
          <v-layout wrap align-center>
            <v-flex xs4>
              <v-card dark color="primary" to="/ECE-dashboard">
                <v-card-text class="px-2">School of engineering card</v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs4 px-2>
              <v-card dark color="primary" >
                <v-card-text class="px-2">School of built environment card </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs4>
              <v-card dark color="primary">
                <v-card-text class="px-2"> School of fine art card</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue"
export default {
    name: 'principal-dashboard',
    components: {
      Navigation,
    }
}
</script>
<style>

</style>
