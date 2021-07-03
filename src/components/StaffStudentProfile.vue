<template>
  <div class="pa-3 student-profile">
    <div v-if="student" class="px-3 text-left body-2 mx-auto">
      <div class="pa-1">
        <span class="font-weight-bold">Name</span>
        : {{ student.firstName }} {{ student.lastName }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Email</span>
        : {{ student.email }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Contacts</span>
        : {{ student.phoneNumber }}
      </div>
      <div v-if="student.program" class="pa-1">
        <span class="font-weight-bold">Programme</span>
        : {{ student.program.name }}
      </div>
      <div v-if="studentReport.resubmittedReportURL" class="pa-1 wrap-text">
        <span class="font-weight-bold">Resubmitted Report</span>
        :
        <span class="subheading"
          >&nbsp;
          <a :href="studentReport.resubmittedReportURL" target="_blank">
            {{ studentReport.resubmittedReportURL }}
          </a>
        </span>
      </div>
      <div v-if="studentReport.reportURL" class="pa-1 wrap-text">
        <span class="font-weight-bold">Submitted Report</span>
        :
        <span class="subheading"
          >&nbsp;
          <a :href="studentReport.reportURL" target="_blank">
            {{ studentReport.reportURL }}
          </a>
        </span>
      </div>
      <div v-if="studentReport.finalReportURL" class="pa-1 wrap-text">
        <span class="font-weight-bold">Final Report</span>
        :
        <span class="subheading"
          >&nbsp;
          <a :href="studentReport.finalReportURL" target="_blank">
            {{ studentReport.finalReportURL }}
          </a>
        </span>
      </div>
      <div v-if="studentReport.complainceReportURL" class="pa-1 wrap-text">
        <span class="font-weight-bold">Compliance Report</span>
        :
        <span class="subheading"
          >&nbsp;
          <a :href="studentReport.complainceReportURL" target="_blank">
            {{ studentReport.complainceReportURL }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "StaffStudentProfile",
  computed: {
    ...mapGetters(["studentReport", "student"]),
  },
};
</script>

<style>
.student-profile {
  overflow: hidden;
}
.wrap-text {
  word-wrap: normal;
}
</style>