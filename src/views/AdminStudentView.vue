<template>
  <div>
    <div class="navbar">
      <Navigation />
    </div>
    <div class="pt-5">
      <v-layout row pt-4>
        <v-flex md3></v-flex>
        <v-flex v-if="route===`timeline`" md9 style="height: 88vh;" class="scroll-y">
          <Timeline />
        </v-flex>
        <v-flex v-else md9 style="height: 88vh;" class="scroll-y">
          <StudentProfile />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/Navbar.vue";
import Timeline from "@/components/Timeline.vue";
import StudentProfile from "@/components/StudentProfile.vue";
export default {
  name: "studentview",
  components: {
    Timeline,
    Navigation,
    StudentProfile,
  },
  data() {
    return {
      route: "timeline",
    };
  },
  methods: {
    setTimelineRoute(route) {
      this.route = route;
    },
  },
};
</script>