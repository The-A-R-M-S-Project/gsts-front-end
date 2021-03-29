<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :loading="submitLoading" color="primary"
          >Upload Report</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Upload viva committee report
          <v-spacer></v-spacer>
          <v-btn
            @click="viewDetails()"
            dark
            large
            :disabled="user.role === 'secretary'"
            icon
            :loading="detailLoading"
          >
            <v-icon large dark> mdi-open-in-new </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="py-3 px-6">
          <v-form ref="uploadedVivaReportForm">
            <p class="pt-3">
              <v-file-input
                label="File input"
                placeholder="Click here to upload viva report file"
                outlined
                counter
                v-model="vivaReport"
                :error="fileSelected"
                :error-messages="fileErrorMessage"
                :show-size="1000"
                truncate-length="100"
                prepend-icon="mdi-file-document"
                accept=".doc,.docx,.pdf"
              ></v-file-input>
            </p>
          </v-form>
          <div class="text-center">
            <v-btn color="primary" @click="uploadVivaCommitteeReport">
              Save
            </v-btn>
          </div>
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
  name: "SetVivaDate",
  data() {
    return {
      dialog: false,
      vivaReport: null,
      fileSelected: false,
      fileErrorMessage: [],
    };
  },
  mounted() {
    this.fileSelected = false;
    this.fileErrorMessage = [];
  },
  computed: {
    ...mapGetters([
      "selectedStudent",
      "submitLoading",
      "detailLoading",
      "user",
    ]),
  },
  methods: {
    viewDetails() {
      this.$router.push(`/student-progress/${this.selectedStudent._id}`);
    },
    async uploadVivaCommitteeReport() {
      if (
        this.$refs.uploadedVivaReportForm.validate() &&
        this.checkUploadedReport()
      ) {
        let formData = new FormData();
        formData.append("vivaCommitteeReport", this.vivaReport);
        await this.$store.dispatch("uploadVivaCommitteeReport", {
          studentReportID: this.selectedStudent._id,
          report: formData,
          studentName: this.selectedStudent.student.name,
        });
        this.dialog = false;
      }
    },
    checkUploadedReport() {
      if (this.vivaReport) {
        this.fileSelected = false;
        this.fileErrorMessage = [];
        return true;
      } else {
        this.fileSelected = true;
        this.fileErrorMessage = "Please upload a file";
        return false;
      }
    },
  },
};
</script>