<template>
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
    <div class="v-stepper__content">
      <div class="body-1 mb-1">Congratulations! You've successfully completed your viva examination.</div>
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
  </v-stepper>
</template>

<script>
import LoadingDots from "@/components/LoadingDots.vue";
export default {
  data() {
    return {
      e6: 6,
    };
  },
  components: {
    LoadingDots,
  },
};
</script>
