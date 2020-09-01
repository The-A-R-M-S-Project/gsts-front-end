<template>
  <div class="py-5">
    <div class="display-1 text-center font-weight-medium mb-4">Report submission</div>
    <v-card
      v-if="student.report"
      :max-width="$vuetify.breakpoint.xs?'95vw':'70vw'"
      class="mx-auto pa-5"
    >
      <p>
        <span class="body-1 font-weight-light">Title:</span>
        <span>&nbsp;{{ student.report.title }}</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Abstract:</span>
        <span>&nbsp;Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Upload status:</span>
        <span class="subheading">&nbsp; Report abstract uploaded</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Due Date:</span>
        <span class="subheading">&nbsp;-</span>
      </p>
      <p class="mb-10">
        <span class="body-1 font-weight-light">Last modified:</span>
        <span class="subheading">&nbsp; {{formatDate(student.report.createdAt)}}</span>
      </p>
      <v-form>
        <v-file-input
          label="File input"
          placeholder="Click here to upload your report"
          outlined
          counter
          v-model="report"
          :error="fileSelected"
          :error-messages="fileErrorMessage"
          :show-size="1000"
          truncate-length="100"
          prepend-icon="mdi-file-document"
          required
        ></v-file-input>
      </v-form>
      <v-row justify="end" class="px-3 pt-2">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" dark color="teal">submit</v-btn>
          </template>

          <v-card>
            <v-card-title class="text-center headline purple white--text">Confirm</v-card-title>
            <v-card-text class="py-3 px-6">
              <p class="body-1">
                <v-icon color="primary" class="mr-2">mdi-alert-circle</v-icon>Once you submit this report, you cannot edit your submission or re-submit
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="success" text @click="checkReportExists">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
    <!-- <v-card v-else :max-width="$vuetify.breakpoint.xs?'95vw':'70vw'" class="mx-auto pa-5">
      <p>
        <span class="body-1 font-weight-light">Title:</span>
        <span>&nbsp;{{ student.report.title }}</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Abstract:</span>
        <span>&nbsp;Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem Lorem ipsum lorem ipsum lorem</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Upload status:</span>
        <span class="subheading">&nbsp; Report abstract uploaded</span>
      </p>
      <p>
        <span class="body-1 font-weight-light">Due Date:</span>
        <span class="subheading">&nbsp;-</span>
      </p>
      <p class="mb-10">
        <span class="body-1 font-weight-light">Last modified:</span>
        <span class="subheading">&nbsp; {{formatDate(student.report.createdAt)}}</span>
      </p>
      <v-form>
        <v-file-input
          label="File input"
          placeholder="Click here to upload your report"
          outlined
          counter
          v-model="report"
          :error="fileSelected"
          :error-messages="fileErrorMessage"
          :show-size="1000"
          truncate-length="100"
          prepend-icon="mdi-file-document"
          required
        ></v-file-input>
      </v-form>
      <v-row justify="end" class="px-3 pt-2">
        <v-btn @click="checkReportExists" dark color="teal">submit</v-btn>
      </v-row>
    </v-card>-->
  </div>
</template>

<script>
export default {
  name: "report-submission",
  data() {
    return {
      report: null,
      dialog: false,
      fileSelected: false,
      fileErrorMessage: [],
    };
  },
  mounted() {
    this.fileSelected = false;
    this.fileErrorMessage = [];
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
  },
  methods: {
    formatDate(timestamp) {
      let diff = Math.abs(new Date() - new Date(timestamp));
      let seconds = diff / 1000;
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      if (seconds < 60) {
        return "a few seconds ago";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 7) {
        return `${days} days ago`;
      } else {
        let monthDay = new Date(timestamp);
        return `${monthDay.toLocaleTimeString(
          {},
          {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          }
        )}, ${new String(monthDay).substring(4, 15)}`;
      }
    },
    checkReportExists() {
      if (this.report) {
        this.fileSelected = false;
        this.fileErrorMessage = [];
        console.log("Report: ", this.report);
      } else {
        this.fileSelected = true;
        this.fileErrorMessage = "Please upload a file for your report";
      }
      this.dialog = false;
    },
  },
};
</script>