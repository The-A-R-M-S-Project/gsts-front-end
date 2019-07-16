<template>
  <v-layout row wrap pa-3>
    <v-flex xs12 sm12 md4>
        <v-date-picker
          v-model="date"
          full-width
          :events="eventDatesArr"
          event-color="green lighten-1"
        ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm12 md4 pl-3>
        <v-card height="100%">
          <v-container fluid pa-0>
            <v-toolbar color="blue darken-2" dark height="89" flat>
              <v-toolbar-title>Date Events: ({{ selectedDate }})</v-toolbar-title>
            </v-toolbar>
            <!-- <ul class="ma-3">
              <li v-for="note in notes" :key="note">{{ note }}</li>
            </ul> -->
          </v-container>
        </v-card>
    </v-flex>
    <v-flex xs12 sm12 md4 pl-1>
        <v-card height="100%">
          <v-container fluid pa-0>
            <v-toolbar color="blue darken-2" dark height="89" flat>
              <v-toolbar-title>Event Details</v-toolbar-title>
            </v-toolbar>
            <div class="subheading">Event title</div>
            <!-- <ul class="ma-3">
              <li v-for="note in notes" :key="note">{{ note }}</li>
            </ul> -->
          </v-container>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CalendarEvents from "@/services/calendar-events-service.js";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    selectedDate: '',
    eventDatesArr: null,
  }),

  updated() {
    this.events = CalendarEvents.getEventsByDate(this.date);
    this.selectedDate = this.date
  },

  methods: {
  },

  mounted() {
    this.eventDatesArr = CalendarEvents.eventDates
  }
};
</script>