<template>
    <div>
        <template v-if="user.role === 'principal'">
            <Navigation />
        </template>
        <template v-else-if="user.role === 'dean'">
            <DeanNav />
        </template>
        <v-container fluid class="pt-1">
            <v-row class="mx-1">
                <StudentsTable />
            </v-row>
        </v-container>
    </div>
</template>
<style></style>
<script>
import StudentsTable from "@/components/StudentsTable.vue";
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";

export default {
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    components: {
        StudentsTable,
        Navigation,
        DeanNav,
    },
};
</script>
