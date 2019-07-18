<template>
  <div>
    <div class="navbar">
        <Navigation/>
    </div>
    <div class="scroll-y pt-5">
        <Timeline/>
    </div>
  </div>
</template>
<script>
import Navigation from "@/components/Navbar.vue"
import Timeline from "@/components/Timeline.vue"
export default {
  name: "studentview",
  components: {
    Timeline,
    Navigation,
  },
};
</script>