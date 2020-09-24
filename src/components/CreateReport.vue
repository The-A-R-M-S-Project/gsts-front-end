<template>
  <div class="py-5">
    <div class="display-1 text-center font-weight-medium mb-4">
      Create a report
    </div>
    <v-card
      :max-width="$vuetify.breakpoint.xs ? '95vw' : '70vw'"
      class="mx-auto pa-5"
    >
      <v-alert
        dark
        dismissible
        v-if="displayReportActionMessage"
        color="success"
        class="text-center"
        >{{ reportActionMessage }}</v-alert
      >
      <h5 class="pt-4 pb-2">
        <span class="primary--text">Note:</span> This is not your final report
        submission!
      </h5>
      <v-form ref="createReportForm">
        <p>
          <span class="body-1 font-weight-bold">Title:</span>
          <v-text-field
            outlined
            v-model="reportTitle"
            placeholder="Enter report title"
            type="text"
            :rules="required"
          ></v-text-field>
        </p>
        <p>
          <span class="body-1 font-weight-bold">Abstract:</span>
          <br />
          <span class="body-2">
            <v-icon color="primary" class="mr-2">mdi-alert-circle</v-icon>This
            is field is optional
          </span>
          <v-textarea
            outlined
            v-model="reportAbstract"
            :rules="[abstractRules.before]"
            label="Insert an abstract"
            :hint="words"
          ></v-textarea>
        </p>
        <v-row justify="end" class="px-3 pt-2">
          <v-btn
            @click="createReport"
            type="submit"
            :loading="detailLoading"
            dark
            color="teal"
            >submit</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "create-report",
  data() {
    return {
      displayReportActionMessage: false,
      reportTitle: "",
      reportAbstract: "",
      required: [(field) => !!field || "This field is required"],
      abstractRules: {
        before: (abstract) =>
          this.countWords(abstract || "") < 100 ||
          "Your abstract should be less than 100 words!",
        after: (field) => !!field || "This field is required",
      },
    };
  },
  computed: {
    reportActionMessage() {
      return this.$store.getters.reportActionMessage;
    },
    words() {
      return `Words: ${this.countWords(this.reportAbstract)}`;
    },
    detailLoading() {
      return this.$store.getters.detailLoading;
    },
  },
  methods: {
    createReport() {
      event.preventDefault();
      let newReport = {};
      if (this.reportAbstract.length > 0) {
        newReport = {
          title: this.reportTitle,
          abstract: this.reportAbstract,
        };
      } else {
        newReport = {
          title: this.reportTitle,
        };
      }
      this.$store.dispatch("createReport", newReport).then(() => {
        this.displayReportActionMessage = true;
        this.$store.dispatch("fetchLoggedInStudentDetails");
      });
    },
    countWords(s) {
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/\s\s+/g, " ");
      s = s.replace(/,/g, " ");
      s = s.replace(/;/g, " ");
      s = s.replace(/\//g, " ");
      s = s.replace(/\\/g, " ");
      s = s.replace(/{/g, " ");
      s = s.replace(/}/g, " ");
      s = s.replace(/\n/g, " ");
      s = s.replace(/\./g, " ");
      s = s.replace(/[[\]]/g, " ");
      s = s.replace(/[ ]{2,}/gi, " ");
      var countWordsBySpaces = s.split(" ").length;
      return countWordsBySpaces;
    },
  },
};
</script>