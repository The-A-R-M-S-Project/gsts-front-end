<template>
    <div>
        <Navigation/>
        <Sidenav/>
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
