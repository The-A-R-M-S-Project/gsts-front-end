<template>
  <div class="pt-4">
    <div class="display-1 text-center font-weight-medium mb-4">Progress</div>
    <v-row justify="center" :align="user.role==='student'?'center':'start'">
      <v-col cols="12" md="4">
        <v-row>
          <v-col>
            <div class="text-center">
              <v-progress-circular
                :rotate="-90"
                size="250"
                width="20"
                :value="event.value"
                :color="event.color"
                class="my-3"
              >
                {{ event.value }}%
                <br />
                {{event.message}}
              </v-progress-circular>
            </div>
            <div
              class="text-center"
              v-show="user.role !== 'student' && event.message === 'Submitted'"
            >
              <v-btn color="primary">Assign examiner</v-btn>
            </div>
          </v-col>
          <v-col v-show="user.role !== 'student'">
            <div class="pa-3">
              <div class="px-3 text-left body-2 mx-auto">
                <div class="pa-1">
                  <span class="font-weight-bold">Name</span>
                  : Student Name
                </div>

                <div class="pa-1">
                  <span class="font-weight-bold">Gender</span> : Male
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Email</span> : Student@cedat.mak.ac.ug
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Contacts</span> : +256701000000
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Department</span>: Electrical and Computer Engineering
                </div>

                <div class="pa-1">
                  <span class="font-weight-bold">Programme</span> : Master of Science in telecom engineering
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Registraion Number</span> : 19/U/168/PS
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Year of Study</span> : I
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" class="px-10">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step color="teal" :complete="e6 > 1" step="1">Report sent</v-stepper-step>
          <template v-if="e6 > 1">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">Your report has been submitted to the right person</div>
              <div class="caption mt-3 font-weight-light">Fri Jul 24, 18:40</div>
            </div>
          </template>
          <v-stepper-content step="1">
            <template v-if="e6 === 1">
              <div class="body-1 mb-1">Submit your report for grading</div>
              <div class="body-2">
                In case you haven't submitted your report, click
                <a href>here</a>
              </div>
            </template>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 2" step="2">Report received by examiner</v-stepper-step>
          <template v-if="e6 > 2">
            <div class="v-stepper__content">
              <div class="body-1">Your examiner has acknowledged receipt of your report</div>
              <div class="caption mt-3 font-weight-light">Fri Jul 24, 18:40</div>
            </div>
          </template>
          <v-stepper-content step="2">
            <template v-if="e6 === 2">
              <div class="body-1 mb-1">
                Waiting for the examiner to acknowledge receipt of your report
                <LoadingDots />
              </div>
              <div class="body-2">You'll be notified as soon as he does</div>
            </template>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 3" step="3">Report returned by examiner</v-stepper-step>
          <template v-if="e6 > 3">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">Your report has been marked and graded.</div>
              <div class="body-2">
                You scored
                <span class="subtitle-1">
                  <strong>
                    <u>71%</u>
                  </strong>
                </span>
              </div>
              <div class="caption mt-3 font-weight-light">Fri Jul 24, 18:40</div>
            </div>
          </template>
          <v-stepper-content step="3">
            <div class="body-1 mb-1">
              Your report is being marked and graded
              <LoadingDots />
            </div>
            <div class="body-2">You'll be notified as soon as your score is available.</div>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 4" step="4">Viva date set</v-stepper-step>
          <template v-if="e6 > 4">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">
                Your viva examination date has been set to
                <span
                  class="headline text-color blue--text"
                >2nd November, 2020</span>
              </div>
              <div class="body-2">
                <strong>Location:</strong> Cedat conference hall
              </div>
              <div class="caption mt-3 font-weight-light">Fri Jul 24, 18:40</div>
            </div>
          </template>
          <v-stepper-content step="4">
            <div class="body-1 mb-1">An appropriate date will be set for your viva examination.</div>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 5" step="5">Viva examination</v-stepper-step>
          <template v-if="e6 > 5">
            <div class="v-stepper__content">
              <div
                class="body-1 mb-1"
              >Congratulations! You've successfully completed your viva examination.</div>
              <div class="body-2">
                You scored
                <span class="subtitle-1">
                  <strong>
                    <u>83%</u>
                  </strong>
                </span>
              </div>
              <div class="caption mt-3 font-weight-light">Fri Jul 24, 18:40</div>
            </div>
          </template>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingDots from "@/components/LoadingDots.vue";
export default {
  data() {
    return {
      e6: 3,
      interval: {},
      event: {},
      progressEvents: [
        {
          value: 0,
          message: "Not submitted",
          color: "grey",
        },
        {
          value: 16,
          message: "Submitted",
          color: "deep-orange darken-2",
        },
        {
          value: 30,
          message: "With examiner",
          color: "deep-orange darken-1",
        },
        {
          value: 44,
          message: "Cleared by examiner",
          color: "orange",
        },
        {
          value: 58,
          message: "Viva date set",
          color: "orange lighten-1",
        },
        {
          value: 72,
          message: "Viva complete",
          color: "amber",
        },
        {
          value: 86,
          message: "Pending revision",
          color: "green lighten-2",
        },
        {
          value: 100,
          message: "Complete",
          color: "green darken-3",
        },
      ],
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    let index = 0;
    this.interval = setInterval(() => {
      this.event = this.progressEvents[index];
      index += 1;
      if (this.event.value === 100) {
        index = 0;
      }
    }, 1000);
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    LoadingDots,
  },
};
</script>
