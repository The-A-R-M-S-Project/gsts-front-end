<template>
  <v-layout column wrap pa-3>
    <v-flex xs12>
      <v-card class="mt-3 mx-auto">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="20"
          max-width="calc(100% - 32px)"
          dark
        >
          <v-date-picker
            v-model="date"
            full-width
            :events="eventDatesArr"
            event-color="teal"
            color="purple"
            landscape
          ></v-date-picker>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">User Registrations</div>
          <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="mr-2" small>mdi-clock</v-icon>
          <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- <v-flex xs12 pl-3>
      <v-card height="100%">
        <v-container fluid pa-0>
          <v-toolbar color="blue darken-2" dark height="89" flat>
            <v-toolbar-title>Date Events: ({{ date }})</v-toolbar-title>
          </v-toolbar>
          <v-list v-for="(event, index) in events" :key="index">
            <v-list-tile v-on:click="clickedEvent(event)">
              <v-list-tile-avatar>
                <v-icon>calendar_today</v-icon>
              </v-list-tile-avatar>
              <h4>{{ event.title }}</h4>
            </v-list-tile>

            <v-divider></v-divider>
          </v-list>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 pl-1>
      <v-card height="100%">
        <v-container fluid pa-0>
          <v-toolbar color="blue darken-2" dark height="89" flat>
            <v-toolbar-title>Event Details</v-toolbar-title>
          </v-toolbar>
          <v-card-title primary-title>
            <div height="100%">
              <h4>{{ eventBody.title}}</h4>
              <p>{{ eventBody.content }}</p>
              <p>{{ eventBody.date }}</p>
            </div>
          </v-card-title>
        </v-container>
        <v-card-actions>
          <v-btn @click="clearEvent()">clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>-->
  </v-layout>
</template>

<script>
import CalendarEvents from "@/services/calendar-events-service.js";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    selectedDate: "",
    eventDatesArr: null,
    eventDetails: {}
  }),

  methods: {
    clickedEvent: function(event) {
      this.eventDetails = event;
    },
    clearEvent: function() {
      this.eventDetails = {};
    }
  },

  computed: {
    events: function() {
      return CalendarEvents.getEventsByDate(this.date);
    },
    eventBody: function() {
      return this.eventDetails;
    }
  },

  mounted() {
    this.eventDatesArr = CalendarEvents.eventDates;
  },
  updated() {
    this.selectedDate = this.date;
  }
};
</script>
<style>
.v-sheet--offset {
  top: -30px;
  position: relative;
}
</style>
