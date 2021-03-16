<template>
  <div class="pa-3">
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
      <div v-if="studentReport" class="pa-1">
        <span class="font-weight-bold">Report</span>
        :
        <span class="subheading"
          >&nbsp;
          <a :href="studentReport.reportURL" target="_blank">
            {{ studentReport.title }}
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