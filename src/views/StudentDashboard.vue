<template>
  <div>
    <div class="navbar">
        <Navigation/>
    </div>
    <div class="pt-5">
      <v-layout row pt-4>
        <v-flex md3>
          <SideNav @routeChange="setTimelineRoute" @clickedProfile="setTimelineRoute"/>
        </v-flex>
        <v-flex md9 style="height: 88vh;" class="scroll-y">
          <router-view/>
        </v-flex>
        
      </v-layout>
    </div>
    
  </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue"
import SideNav from "@/components/StudentSidenav.vue"

export default {
  name: "student-dashboard",
  components: {
    Navigation,
    SideNav,
  },
  data() {
    return {
      route: "timeline"
    }
  },
  methods: {
    setTimelineRoute(route) {
      this.route = route
    }
  }
};
</script>
