<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary"
          >Set viva date</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Set viva date
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
          <p class="black--text body-1">
            Set viva date for {{ selectedStudent.student.firstName }}
            {{ selectedStudent.student.lastName }}
          </p>
          <v-alert
            v-if="displayDateTimeError"
            dark
            class="text-center"
            color="error"
          >
            {{ errorMessage }}
          </v-alert>
          <v-alert v-if="displayMessage" :type="vivaPanelMessage.status" dark class="text-center">
            {{ vivaPanelMessage.message }}
          </v-alert>
          <v-row>
            <!-- Date picker -->
            <v-col cols="12" sm="6">
              <v-date-picker
                v-model="picker"
                full-width
                color="purple"
                show-current
                type="date"
              ></v-date-picker>
            </v-col>

            <!-- Time picker -->
            <v-col cols="12" sm="6">
              <div class="text-center">
                <v-time-picker
                  v-model="time"
                  color="purple"
                  :width="$vuetify.breakpoint.xs ? '230' : '290'"
                ></v-time-picker>
              </div>
            </v-col>

            <!-- Viva committee -->
            <v-col cols="12">
              <p class="body-1 text-center">
                <strong>Viva Panel</strong>
                <span>
                  <v-row>
                    <v-col cols="12">
                      <v-simple-table :key="vivaPanelSectionKey">
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center"><v-icon>mdi-account</v-icon></th>
                              <th class="text-center"><v-icon>mdi-email</v-icon></th>
                              <th class="text-center"><v-icon>mdi-phone</v-icon></th>
                              <th class="text-center"><v-icon>mdi-home</v-icon></th>
                              <th v-if="user.role === 'dean' && progressEvents[`${selectedStudent.status}`].step < 5" class="text-center">
                                <v-icon>mdi-information-outline</v-icon>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="!selectedStudent.viva || selectedStudent.viva.vivaCommittee.length === 0" class="text-center grey--text text--darken-2">
                              <td colspan="4" class="body-1">None</td>
                            </tr>
                            <tr v-else v-for="(member, index) in selectedStudent.viva.vivaCommittee" :key="index">
                              <td>{{ member.name }}</td>
                              <td>{{ member.email }}</td>
                              <td v-if="member.phone">{{ member.phone }}</td>
                              <td v-else class="text-center"> - </td>
                              <td>{{ member.affiliation }}</td>
                              <td v-if="user.role === 'dean' && progressEvents[`${selectedStudent.status}`].step < 5">
                                <v-btn @click="selectVivaMember(member)" :loading="submitLoading" icon color="primary">
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      
                      <!-- Confirm viva panel member removal -->
                      <v-dialog v-model="confirmVivaMemberRemoval" width="500">
                        <v-card class="py-4 pr-3">
                          <v-card-title>Are you sure?</v-card-title>
                          <v-card-text>
                            By clicking <i>Remove</i>, you are removing <strong>{{ selectedVivaMember.name }}</strong> from 
                            <strong>{{selectedStudent.student.lastName}} {{selectedStudent.student.firstName}}</strong>'s 
                            viva panel.
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="confirmVivaMemberRemoval = false">Cancel</v-btn>
                            <v-btn color="error" @click="removeVivaMember()">Remove</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </span>
                <SetVivaCommittee />
              </p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" text @click="setVivaDate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SetVivaCommittee from "@/components/SetVivaCommittee.vue";

export default {
  name: "SetVivaDate",
  data() {
    return {
      dialog: false,
      name: "",
      email: "",
      affiliation: "",
      picker: null,
      time: null,
      displayDateTimeError: false,
      errorMessage: "Please select a date and time",
      confirmVivaMemberRemoval: false,
      selectedVivaMember: {},
      displayMessage: false
    };
  },
  mounted() {
    this.displayDateTimeError = false;
  },
  computed: {
    ...mapGetters(["selectedStudent", 
      "submitLoading", 
      "detailLoading", 
      "progressEvents", 
      "user",
      "vivaPanelSectionKey",
      "vivaPanelMessage"
    ]),
  },
  methods: {
    viewDetails() {
      this.$router.push(`/student-progress/${this.selectedStudent._id}`);
    },
    selectVivaMember(member){
      this.selectedVivaMember = member;
      this.confirmVivaMemberRemoval = true;
    },
    async removeVivaMember(){
      await this.$store.dispatch("removeVivaCommitteeMember", {
        reportID: this.selectedStudent._id,
        payload: {
          email: this.selectedVivaMember.email
        }
      });
      this.confirmVivaMemberRemoval = false;
      this.displayMessage = true;
      setTimeout(() => {
        this.displayMessage = false;
      }, 5000);
      await this.$store.dispatch("fetchReports");
      this.$store.commit("changeVivaPanelSectionKey");
    },
    async setVivaDate() {
      if (this.picker && this.time && this.selectedStudent.viva) {
        let date = new Date(this.picker).toISOString().substring(0, 11);
        let dateTime = `${date}${this.time}:00.000+03:00`;
        await this.$store.dispatch("setVivaDate", {
          reportID: this.selectedStudent._id,
          studentName: `${this.selectedStudent.student.firstName} ${this.selectedStudent.student.lastName}`,
          vivaDate: { vivaDate: dateTime },
        });
        await this.$store.dispatch("fetchReports");
        this.$store.dispatch("changeStudentsTableKey");
        this.dialog = false;
      } else {
        if(!this.selectedStudent.viva){
          this.errorMessage = "Please add members to this student's viva panel"
        }
        this.displayDateTimeError = true;
        setTimeout(() => {
          this.displayDateTimeError = false;
        }, 5000);
      }
    },
  },
  components: {
    SetVivaCommittee
  }
};
</script>