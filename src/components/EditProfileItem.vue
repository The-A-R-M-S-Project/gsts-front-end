<template>
  <v-row justify="center">
    <v-dialog v-model="editProfile" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editProfileForm">
            <v-text-field
              v-if="profileItemTag === 'name'"
              v-model="firstname"
              :rules="nameRules"
              label="First name"
            ></v-text-field>
            <v-text-field
              v-if="profileItemTag === 'name'"
              v-model="lastname"
              :rules="nameRules"
              label="Last name"
            ></v-text-field>
            <v-text-field
              v-if="profileItemTag === 'email'"
              v-model="email"
              :rules="emailRules"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-if="profileItemTag === 'phone'"
              v-model="phoneNumber"
              :rules="phoneNumberRules(10)"
              label="Phone"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeProfileEditor">Close</v-btn>
          <v-btn color="success" text @click="closeProfileEditor">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "edit-profile-item",
  data() {
    return {
      email: "",
      emailRules: [
        (email) => !!email || "E-mail is required",
        (email) =>
          /.+@cedat\.mak\.ac\.ug/.test(email) || "Please enter a valid email",
      ],
      firstname: "",
      lastname: "",
      nameRules: [(name) => !!name || "This field is required"],
      phoneNumber: "",
      phoneNumberRules: (len) => [
        (phoneNumberField) =>
          (phoneNumberField || "").length === 10 ||
          `Phone number must be ${len} digits`,
        (number) => !!number || "Phone number is required",
        (number) =>
          /(?=^07)(?=\d{10})/.test(number) || "The phone number is not valid",
      ],
    };
  },
  computed: {
    profileItemTag() {
      return this.$store.getters.profileItemTag;
    },
    editProfile() {
      return this.$store.getters.editProfile;
    },
  },
  methods: {
    closeProfileEditor() {
      this.$store.dispatch("showProfileEditor", false);
    },
  },
};
</script>