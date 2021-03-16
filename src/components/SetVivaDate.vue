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
            dismissible
            color="error"
            >Please select a date and time</v-alert
          >
          <v-row>
            <v-col cols="12" sm="6">
              <v-date-picker
                v-model="picker"
                full-width
                color="purple"
                show-current
                type="date"
              ></v-date-picker>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-center">
                <v-time-picker
                  v-model="time"
                  color="purple"
                  :width="$vuetify.breakpoint.xs ? '230' : '290'"
                ></v-time-picker>
              </div>
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
    };
  },
  mounted() {
    this.displayDateTimeError = false;
  },
  computed: {
    ...mapGetters(["selectedStudent", "submitLoading", "detailLoading"]),
  },
  methods: {
    viewDetails() {
      this.$router.push(`/student-progress/${this.selectedStudent._id}`);
    },
    async setVivaDate() {
      if (this.picker && this.time) {
        let date = new Date(this.picker).toISOString().substring(0, 11);
        let dateTime = `${date}${this.time}:00.000+03:00`;
        await this.$store.dispatch("setVivaDate", {
          reportID: this.selectedStudent._id,
          studentName: this.selectedStudent.student.name,
          vivaDate: { vivaDate: dateTime },
        });
        await this.$store.dispatch("fetchReports");
        this.$store.dispatch("changeStudentsTableKey");
        this.dialog = false;
      } else {
        this.displayDateTimeError = true;
      }
    },
  },
};
</script>