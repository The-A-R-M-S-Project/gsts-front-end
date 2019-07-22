<template>
  <v-card>
    <v-timeline align-top dense>
      <v-timeline-item color="teal" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>Report handed in</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="grey" small>
        <v-layout wrap pt-3>
          <v-flex xs3>
            <strong>Report sent to examiner</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption mb-2"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="grey" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>Report recieved by examiner</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
          </v-flex>
        </v-layout>
      </v-timeline-item>

      <v-timeline-item color="grey" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>Report returned by examiner</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
      <v-timeline-item color="grey" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>Viva date set</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
      <v-timeline-item color="grey" small>
        <v-layout pt-3>
          <v-flex xs3>
            <strong>Vivas done</strong>
          </v-flex>
          <v-flex>
            <strong></strong>
            <div class="caption"></div>
          </v-flex>
        </v-layout>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {};
</script>
