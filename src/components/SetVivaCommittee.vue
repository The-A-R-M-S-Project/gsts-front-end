<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary"
          >Add member</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Set viva panel
          <v-spacer></v-spacer>
          <v-btn
            @click="viewDetails()"
            dark
            large
            icon
            :loading="detailLoading"
          >
            <v-icon large dark> mdi-open-in-new </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-3 px-6">
          <p v-if="selectedStudent.student" class="black--text body-1">
            Add a member to {{ selectedStudent.student.firstName }}
            {{ selectedStudent.student.lastName }}'s viva examination panel
            <v-alert
            v-if="displayFeedback"
            :type="vivaPanelMessage.status"
            class="text-center mx-auto"
            width="500"
            >
            {{ vivaPanelMessage.message }}
            </v-alert>
          </p>

          <v-row>
            <v-col cols="12" class="px-sm-12">
              <h3 class="text-center black--text">Add Viva Committee Member</h3>
              <v-form ref="addVivaCommitteeMemberForm" class="px-sm-12">
                <v-text-field
                  v-model="name"
                  label="Name"
                  :rules="required"
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field>
                <v-text-field
                  v-model="phoneNumber"
                  label="Phone Number (07...)"
                  hint="This field is optional"
                  :rules="phoneNumberRules"
                  persistent-hint
                  color="purple"
                ></v-text-field>
                <v-text-field
                  v-model="affiliation"
                  label="Affiliation"
                  :rules="required"
                ></v-text-field>
              </v-form>
              <div class="text-center">
                <v-btn @click="addVivaCommitteeMember" color="primary">
                  Add
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SetVivaCommittee",
  data() {
    return {
      dialog: false,
      displayFeedback: false,
      name: "",
      phoneNumber: "",
      email: "",
      affiliation: "",
      required: [(field) => !!field || "This field is required!"],
      emailRules: [
        (email) => !!email || "E-mail is required",
        (email) => /.+@.+\..+/.test(email) || "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapGetters(["selectedStudent", "submitLoading", "detailLoading", "vivaPanelMessage"]),
    phoneNumberRules(){
      return this.phoneNumber ? [
        (number) => /(?=^07)(?=\d{10})/.test(number) || "The phone number is not valid",
        (number) => number.length === 10 || "The phone number should be 10 digits!"
      ] : []
    }
  },
  methods: {
    viewDetails() {
      this.$router.push(`/student-progress/${this.selectedStudent._id}`);
    },
    async addVivaCommitteeMember() {
      if (this.$refs.addVivaCommitteeMemberForm.validate()) {
        let memberDetails;
        if (this.phoneNumber) {
          memberDetails = {
            name: this.name,
            email: this.email,
            phone: this.phoneNumber,
            affiliation: this.affiliation
          };
        } else {
          memberDetails = {
            name: this.name,
            email: this.email,
            affiliation: this.affiliation
          };
        }
        await this.$store.dispatch("addVivaCommitteeMember", {
          reportID: this.selectedStudent._id,
          member: memberDetails
        });
        if(this.vivaPanelMessage === "success") {
          this.dialog = false;
          await this.$store.dispatch("fetchReports");
          this.$store.commit("changeVivaPanelSectionKey");
        } else {
          this.displayFeedback = true;
          setTimeout(() => {
            this.displayFeedback = false;
          }, 5000);
        }
      }
    },
  },
};
</script>