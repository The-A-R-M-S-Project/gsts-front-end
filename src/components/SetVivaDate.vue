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
          >Set viva date</v-card-title
        >
        <v-card-text class="py-3 px-6">
          <p class="black--text body-1">
            Set viva date for {{ selectedStudent.student.name }}
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
            <v-col>
              <v-date-picker
                v-model="picker"
                full-width
                color="purple"
                show-current
                type="date"
              ></v-date-picker>
            </v-col>
            <v-col>
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
      picker: null,
      time: null,
      displayDateTimeError: false,
    };
  },
  mounted() {
    this.displayDateTimeError = false;
  },
  computed: {
    ...mapGetters(["selectedStudent", "submitLoading"]),
  },
  methods: {
    setVivaDate() {
      if (this.picker && this.time) {
        let date = new Date(this.picker).toISOString().substring(0, 11);
        let dateTime = `${date}${this.time}:00.000+03:00`;
        this.$store
          .dispatch("setVivaDate", {
            reportID: this.selectedStudent._id,
            studentName: this.selectedStudent.student.name,
            vivaDate: { vivaDate: dateTime },
          })
          .then(() => {
            this.$store.dispatch("fetchReports").then(() => {
              this.$store.dispatch("changeStudentsTableKey");
            });
          });
        this.dialog = false;
      } else {
        this.displayDateTimeError = true;
      }
    },
  },
};
</script>