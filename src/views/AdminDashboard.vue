<template>
    <div>
      <Navigation/>
      <div class="pa-3">
        <v-card flat min-height="95vh">
          <Sidenav/>
        </v-card>
      </div>
    </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue"
import Sidenav from "@/components/Sidenav.vue"
export default {
    name: 'dashboard',
    components: {
        Navigation,
        Sidenav,
    },
}
</script>

<style lang="scss">


</style>
