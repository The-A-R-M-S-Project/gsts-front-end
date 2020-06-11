<template>
    <v-select
        label="Select a school"
        :items="schools"
        item-text="name"
        return-object
        flat
        dense
        dark
        hide-details
        prepend-icon="mdi-desktop-mac-dashboard"
        single-line
        @input="fetchSchoolData"
        v-model="selectedSchool"
    ></v-select>
</template>

<script>
export default {
    name: "select-school-dropdown",
    data() {
        return {
            selectedSchool: {
                _id: "5c88fa8cf4afda39709c2959",
                name: "School of Built Environment",
                __v: 0,
            },
        };
    },
    mounted() {
        this.$store.dispatch("fetchSchools");
    },
    computed: {
        schools() {
            return this.$store.getters.schools;
        },
    },
    methods: {
        fetchSchoolData() {
            event.preventDefault();
            let route = "";
            if (this.selectedSchool.name == "School of Engineering")
                route = "/ECE-dashboard";
            else if (this.selectedSchool.name == "School of Built Environment")
                route = "/BE-dashboard";
            else if (
                this.selectedSchool.name == "School of Industrial and Fine Arts"
            )
                route = "/FA-dashboard";
            this.$store
                .dispatch("fetchDashboardStats", this.selectedSchool._id)
                .then(() => {
                    if (this.sessionExpired) {
                        this.$router.push("/expired-session");
                    } else {
                        if (this.$route.path !== route) {
                            this.$router.push(route);
                        }
                    }
                });
        },
    },
};
</script>
