<template>
  <div class="pa-3">
    <div class="px-3 text-left body-2 mx-auto">
      <div class="pa-1">
        <span class="font-weight-bold">Name</span>
        : {{ student.name }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Email</span>
        : {{ student.email }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Contacts</span>
        : {{student.phoneNumber }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">School</span>
        : {{ school }}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Department</span>
        : {{ department }}
      </div>

      <div class="pa-1">
        <span class="font-weight-bold">Programme</span>
        : {{student.program.name}}
      </div>
      <div class="pa-1">
        <span class="font-weight-bold">Year of Study</span>
        : {{ student.yearOfStudy }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "staff-student-profile",
  computed: {
    user() {
      return this.$store.getters.user;
    },
    school() {
      return this.user.role !== "student"
        ? this.$store.getters.studentSchool
        : null;
    },
    department() {
      return this.$store.getters.department.name;
    },
    student() {
      return this.$store.getters.student;
    },
  },
};
</script>