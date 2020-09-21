<template>
  <v-row justify="center">
    <v-dialog v-model="editProfile" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Profile</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editProfileForm">
            <v-text-field v-if="profileItemTag === 'name'" label="Name"></v-text-field>
            <v-text-field v-if="profileItemTag === 'email'" label="Email"></v-text-field>
            <v-text-field v-if="profileItemTag === 'phone'" label="Phone"></v-text-field>
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