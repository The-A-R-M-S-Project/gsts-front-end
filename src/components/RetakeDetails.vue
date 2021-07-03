<template>
    <v-card class="mx-auto" :width="$vuetify.breakpoint.xs ? '90%' : '70%'">
        <v-tabs
            v-model="tab"
            centered
            grow
            background-color="purple"
            dark
        >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
            Grade
        </v-tab>

        <v-tab href="#tab-2">
            Assessments
        </v-tab>

        <v-tab href="#tab-3">
            Report
        </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item :value="'tab-' + 1">
                <v-card flat>
                    <v-card-text>
                        <p>
                            <span class="body-1 font-weight-medium">Graded at:</span>
                            <span>&nbsp;{{ formatDate(report.clearedAt) }}</span>
                        </p>
                        <p>
                            <span class="body-1 font-weight-medium">Final score:</span>
                            <span class="headline primary--text">&nbsp;{{ report.finalScore }}% (<strong>{{ report.grade }}</strong>)</span>
                        </p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-' + 2">
                <v-card flat>
                    <v-card-text>
                        <ExaminerAssessment />
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :value="'tab-' + 3">
                <v-card flat>
                    <v-card-text>
                        <p>
                            <span class="body-1 font-weight-medium">Title:</span>
                            <span>&nbsp;{{ report.title }}</span>
                        </p>
                        <p>
                            <span class="body-1 font-weight-medium">Abstract:</span>
                            <span>&nbsp;{{ report.abstract }}</span>
                        </p>
                        <p>
                            <span class="body-1 font-weight-medium">File:</span>
                            <span>&nbsp;
                                <a :href="report.reportURL" target="_blank">{{ report.reportURL }}</a>
                            </span>
                        </p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import ExaminerAssessment from "@/components/ExaminerAssessment.vue";

export default {
    name: "RetakeDetails",
    data(){
        return {
            tab: null
        }
    },
    props: {
        report: Object
    },
    methods: {
        formatDate(timestamp) {
            let monthDay = new Date(timestamp);
            return `${monthDay.toLocaleTimeString(
                {},
                {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
                }
            )}, ${new String(monthDay).substring(4, 15)}`;
        },
    },
    components: {
        ExaminerAssessment
    }
}
</script>