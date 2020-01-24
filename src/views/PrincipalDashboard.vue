<template>
  <div style="height: 100vh;">
    <Navigation />
    <v-container fill-height class="container">
      <v-layout wrap align-center>
        <v-flex md4>
          <v-card class="mx-auto" max-width="344">
            <v-img :src="require('@/assets/principal/ece.jpg')" height="200px"></v-img>
            <v-card-title>
              School of engineering
            </v-card-title>
            <v-card-actions>
              <v-btn class="white--text" color="teal" to="/ECE-dashboard">dashboard</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex md4 px-3>
          <v-card class="mx-auto" max-width="344">
            <v-img :src="require('@/assets/principal/BE.jpg')" height="200px"></v-img>
            <v-card-title>
              School of built environment
            </v-card-title>
            <v-card-actions>
              <v-btn class="white--text" color="purple" to="/BE-dashboard">dashboard</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex md4>
          <v-card class="mx-auto" max-width="344">
            <v-img :src="require('@/assets/principal/FA.jpg')" height="200px"></v-img>
            <v-card-title>
              School of fine art
            </v-card-title>
            <v-card-actions>
              <v-btn class="white--text" color="teal" to="/FA-dashboard">dashboard</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
export default {
  name: "principal-dashboard",
  components: {
    Navigation
  }
};
</script>
<style lang="scss" scoped>
.mx-auto{
  margin: 20px;
  min-width: 250px;
}
.container{
  margin-top: 50px;
}
</style>
