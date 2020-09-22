<template>
  <v-row justify="center">
    <v-dialog v-model="editProfile" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profile</span>
        </v-card-title>
        <v-form ref="editProfileForm" class="px-3">
          <v-card-text>
            <v-text-field
              v-if="profileItemTag === 'name'"
              v-model="lastname"
              :rules="nameRules"
              label="Surname"
            ></v-text-field>
            <v-text-field
              v-if="profileItemTag === 'name'"
              v-model="firstname"
              :rules="nameRules"
              label="First name"
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
              label="Phone (07........)"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeProfileEditor">Close</v-btn>
            <v-btn
              color="success"
              type="submit"
              text
              :loading="profileEditLoader"
              @click="changeProfileDetails"
            >Save</v-btn>
          </v-card-actions>
        </v-form>
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
    profileEditLoader() {
      return this.$store.getters.profileEditLoader;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    closeProfileEditor() {
      this.$store.dispatch("showProfileEditor", false);
    },
    changeProfileDetails() {
      event.preventDefault();
      if (this.$refs.editProfileForm.validate()) {
        let profileEditObject = {};
        if (this.profileItemTag === "name")
          profileEditObject = {
            firstName: this.firstname,
            lastName: this.lastname,
          };
        else if (this.profileItemTag === "email")
          profileEditObject = {
            email: this.email,
          };
        else if (this.profileItemTag === "phone")
          profileEditObject = {
            phoneNumber: this.phoneNumber,
          };

        this.$store
          .dispatch("editProfileDetails", {
            item: profileEditObject,
            role: this.setUserRole(),
          })
          .then(() => {
            this.$store.dispatch("showProfileEditor", false).then(() => {
              if (this.setUserRole() === "staff")
                this.$store.dispatch("fetchLoggedInStaff");
              else this.$store.dispatch("fetchLoggedInStudentDetails");
            });
          });
      }
    },
    setUserRole() {
      if (this.user.role === "student") return "student";
      else return "staff";
    },
  },
};
</script>