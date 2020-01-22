<template>
  <v-card>
    <div v-for="x in Events" :key="x._id">
      <v-timeline align-top dense>
        <v-timeline-item :color="x.eventState == 'done' ? 'teal': 'grey'" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>{{x.eventName}}</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
      </v-timeline>
    </div>
  </v-card>
</template>

<script>
import Events from "@/services/events.js";
export default {
  data() {
    return {
      Events
    }
  },
};
</script>
