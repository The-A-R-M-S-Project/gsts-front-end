<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize white--text"
          to="/"
          @click="logOut"
        >
            <v-icon>power_settings_new</v-icon>
            <span>&nbsp;logout</span>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
<script>
export default {
    name: "navbar",
    methods: {
    logOut() {
        if (localStorage.getItem("jwt") != null) {
        const role = ["principal", "dean", "examiner"].includes(
            localStorage.getItem("user").role
        )
            ? "lecturer"
            : "student";
        this.$http
            .get(
            `https://arms-graduate-student-tracker.herokuapp.com/api/${role}/logout`
            )
            .then(response => {
            console.log("Logged Out!!");
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            this.$router.push({ name: "login" });
            })
            .catch(error => {
            console.log(error.response.data.message);
            });
        }
    }
    }
};
</script>

