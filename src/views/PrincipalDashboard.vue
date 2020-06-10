<template>
    <div style="height: 100vh;">
        <Navigation />
        <v-container class="container">
            <v-row align="center" justify="center">
                <v-col md="6" class="px-5">
                    <v-hover v-slot:default="{ hover }">
                        <v-card
                            class="mx-auto"
                            color="grey lighten-4"
                            max-width="900"
                            height="625"
                        >
                            <v-img
                                :src="
                                    getImageURL(schoolDetails.engineering.image)
                                "
                                height="625"
                            >
                                <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                                        style="height: 100%;"
                                    >
                                        {{ schoolDetails.engineering.name }}
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-btn
                                absolute
                                class="white--text floating-btn"
                                text
                                right
                                bottom
                                :loading="loader"
                                @click="
                                    getSelectedSchool(
                                        schoolDetails.engineering.name
                                    )
                                "
                            >
                                <v-icon large color="yellow"
                                    >mdi-desktop-mac-dashboard</v-icon
                                >
                            </v-btn>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col md="6" class="px-5">
                    <v-row no-gutters>
                        <v-col>
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                    class="mx-auto"
                                    color="grey lighten-4"
                                    max-width="900"
                                    height="255"
                                >
                                    <v-img
                                        :src="
                                            getImageURL(
                                                schoolDetails.builtEnvironment
                                                    .image
                                            )
                                        "
                                        height="255"
                                    >
                                        <v-expand-transition>
                                            <div
                                                v-if="hover"
                                                class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                                                style="height: 100%;"
                                            >
                                                {{
                                                    schoolDetails
                                                        .builtEnvironment.name
                                                }}
                                            </div>
                                        </v-expand-transition>
                                    </v-img>
                                    <v-btn
                                        absolute
                                        class="white--text floating-btn"
                                        text
                                        right
                                        bottom
                                        :loading="loader"
                                        @click="
                                            getSelectedSchool(
                                                schoolDetails.builtEnvironment
                                                    .name
                                            )
                                        "
                                    >
                                        <v-icon large color="yellow"
                                            >mdi-desktop-mac-dashboard</v-icon
                                        >
                                    </v-btn>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col>
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                    class="mx-auto"
                                    color="grey lighten-4"
                                    max-width="900"
                                    height="330"
                                >
                                    <v-img
                                        :src="
                                            getImageURL(
                                                schoolDetails.fineArt.image
                                            )
                                        "
                                        height="330"
                                    >
                                        <v-expand-transition>
                                            <div
                                                v-if="hover"
                                                class="d-flex transition-fast-in-fast-out yellow darken-2 v-card--reveal display-3 black--text text-center"
                                                style="height: 100%;"
                                            >
                                                {{ schoolDetails.fineArt.name }}
                                            </div>
                                        </v-expand-transition>
                                    </v-img>
                                    <v-btn
                                        absolute
                                        class="white--text floating-btn"
                                        text
                                        right
                                        bottom
                                        :loading="loader"
                                        @click="
                                            getSelectedSchool(
                                                schoolDetails.fineArt.name
                                            )
                                        "
                                    >
                                        <v-icon large color="yellow"
                                            >mdi-desktop-mac-dashboard</v-icon
                                        >
                                    </v-btn>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Navigation from "@/components/StudentsNav.vue";
export default {
    name: "principal-dashboard",
    data() {
        return {
            schoolDetails: {
                engineering: {
                    name: "School of Engineering",
                    image: "ece.jpg",
                    route: "/ECE-dashboard",
                },
                builtEnvironment: {
                    name: "School of Built Environment",
                    image: "BE.jpg",
                    route: "/BE-dashboard",
                },
                fineArt: {
                    name: "School of Industrial and Fine Arts",
                    image: "FA.jpg",
                    route: "/FA-dashboard",
                },
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
        loader() {
            return this.$store.getters.loader;
        },
        fetchDashboardStatsError() {
            return this.$store.getters.fetchDashboardStatsError;
        },
    },
    methods: {
        getImageURL(imageName) {
            return require(`../assets/principal/${imageName}`);
        },
        getSelectedSchool(schoolName) {
            if (this.schools) {
                let selectedSchool = this.schools.find((school) => {
                    return school.name == schoolName;
                });

                let selectedSchoolDetails = Object.values(
                    this.schoolDetails
                ).find((school) => {
                    return school.name == schoolName;
                });
                this.$store
                    .dispatch("fetchDashboardStats", selectedSchool._id)
                    .then(() => {
                        if (
                            this.fetchDashboardStatsError.includes(
                                "token has expired!"
                            )
                        ) {
                            this.$router.push("/expired-session");
                        } else {
                            this.$router.push(selectedSchoolDetails.route);
                        }
                    });
            }
        },
    },
    components: {
        Navigation,
    },
};
</script>
<style lang="scss" scoped>
.mx-auto {
    margin: 20px;
    min-width: 250px;
}
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.6;
    position: absolute;
    width: 100%;
}
</style>
