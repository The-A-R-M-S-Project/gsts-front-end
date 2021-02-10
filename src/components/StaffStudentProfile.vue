<template>
  <div class="pa-3">
    <div class="px-3 text-left body-2 mx-auto">
      <div class="pa-1">
        <span class="font-weight-bold">Name</span>
        : {{ studentReport.student.name }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Email</span>
        : {{ studentReport.student.email }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Contacts</span>
        : {{ studentReport.student.phoneNumber }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Programme</span>
        : {{ studentReport.student.program.name }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Report</span>
        : {{ studentReport.title }}
      </div>
      <!-- <div class="pa-1">
        <span class="font-weight-bold">School</span>
        : {{ school }}
      </div>-->
      <!-- <div class="pa-1">
        <span class="font-weight-bold">Department</span>
        : {{ department }}
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "staff-student-profile",
  computed: {
    ...mapGetters(["studentReport"]),
    // user() {
    //   return this.$store.getters.user;
    // },
    // school() {
    //   return this.user.role !== "student" ? this.$store.getters.studentSchool
    //     : null;
    // },
    // department() {
    //   return this.$store.getters.department.name;
    // },
  },
};
</script>