<template>
  <div>
    <div v-if="!cleared">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Report handed In
          <small>Report handed to Deputy Principal by Student</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-btn color="primary" @click="e6 = 2">Report Submitted</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Report sent to examiner
          <small>Report forwarded to examiner by Deputy Principal</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
          <v-btn flat @click="e6 = 1">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Report received by examiner
          <small></small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-btn color="primary" @click="examinerCleared()">Continue</v-btn>
          <v-btn flat @click="e6 = 2">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 4" step="4">
          Report returned by examiner
          <small></small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-btn color="primary" @click="e6=5">Continue</v-btn>
          <v-btn flat @click="e6 = 3">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 5" step="5">
          Viva date set
          <small></small>
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card flat class="mb-5">
            <DatePicker :landscape="true"/>
          </v-card>
          <v-btn color="primary" @click="e6 = 6">set date</v-btn>
          <v-btn flat @click="e6 = 4">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="6">
          Viva pending
          <small></small>
        </v-stepper-step>
        <v-stepper-content step="6">
          <v-card class="mb-5">
            <v-text-field prepend-icon="grade" label="Enter Score" value="score" mask="##"></v-text-field>
          </v-card>
          <v-btn color="primary" @click="vivaDone()">Done</v-btn>
          <v-btn flat @click="e6 = 5">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
    <v-container
      v-if="cleared"
      style="display: flex;"
      class="full-height full-width"
      text-xs-center
    >
      <v-layout row wrap>
        <v-flex xs12 justify-center>
          <v-avatar size="400" color="white">
            <v-icon size="250px" color="success">done</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex xs12 justify-center pa-2>
          <h1>Student is cleared</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import DatePicker from "@/components/DatePicker.vue"
export default {
  components: {
    DatePicker
  },
  data() {
    return {
      e6: 1,
      examiner: true,
      reportMark: true,
      date: "",
      cleared: false
    };
  },
  methods: {
    examinerCleared() {
      this.examiner ? (this.e6 = 4) : (this.e6 = 3);
    },
    setDate() {
      return (
        "on " +
        new Date().toLocaleDateString() +
        " " +
        new Date().toLocaleTimeString()
      );
    },
    vivaDone() {
      this.cleared = true;
    }
  }
};
</script>