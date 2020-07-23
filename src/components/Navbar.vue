<template>
  <nav>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>
        <v-btn
          text
          to="/principal-dashboard"
          class="white--text font-weight-bold text-capitalize title"
        >GSTS</v-btn>
      </v-toolbar-title>
      <v-row justify="end" align="center">
        <v-col md="4" sm="5">
          <SelectSchool />
        </v-col>

        <v-col md="auto" sm="3" class="text-center">
          <v-btn text class="title text-capitalize white--text" to="/students">Students</v-btn>
        </v-col>
        <v-col md="auto" sm="1">
          <v-menu
            offset-y
            offset-x
            :close-on-content-click="closeOnContentClick"
            direction="bottom"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" :class="{'pr-5': $vuetify.breakpoint.sm}">
                <v-avatar size="48">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text class="text-capitalize" to="/under-construction">
                    <v-icon>mdi-account</v-icon>
                    <span>&nbsp;Profile</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text :loading="isLoading" class="text-capitalize" @click="logOut">
                    <v-icon>mdi-power</v-icon>
                    <span>&nbsp;Sign out</span>
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-toolbar>
  </nav>
</template>
<script>
import SelectSchool from "./SelectSchool.vue";
export default {
  name: "menu-bar",
  data() {
    return {
      loading: false,
      closeOnContentClick: true,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    logOut() {
      this.closeOnContentClick = false;
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  components: {
    SelectSchool,
  },
};
</script>

<style>
.small-device-width {
  width: 30vw !important;
}
</style>
