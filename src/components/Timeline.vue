<template>
  <div>
    <div v-if="!cleared">
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
          Report handed In
          <small>Report handed to Deputy Principal by Student {{ setDate() }}</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-btn color="primary" @click="e6 = 2, setDate()">Report Submitted</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Report sent to examiner
          <small>Report forwarded to examiner by Deputy Principal {{' '+date}}</small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 3, setDate()">Continue</v-btn>
          <v-btn flat @click="e6 = 1">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">
          Report received by examiner
          <small>{{' '+date}}</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="examinerCleared()">Continue</v-btn>
          <v-btn flat @click="e6 = 2">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 4" step="4">
          Report returned by examiner
          <small>{{' '+date}}</small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6=5">Continue</v-btn>
          <v-btn flat @click="e6 = 3">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 5" step="5">
          Viva date set
          <small>{{' '+date}}</small>
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 6">set date</v-btn>
          <v-btn flat @click="e6 = 4">Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="6">
          Viva pending
          <small>{{' '+date}}</small>
        </v-stepper-step>

        <v-stepper-content step="6">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click="vivaDone()">Done</v-btn>
          <v-btn flat @click="e6 = 5">Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </div>
    <div v-if="cleared">
        student was cleared
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      e6: 1,
      examiner: true,
      reportMark: true,
      date: "",
      cleared: false
    };
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
        this.cleared = true
    },
  }
};
</script>