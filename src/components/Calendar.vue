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
    <v-flex xs12 sm12 md4 pl-1>
        <v-card height="100%">
          <v-container fluid pa-0>
            <v-toolbar color="blue darken-2" dark height="89" flat>
              <v-toolbar-title>Event Details</v-toolbar-title>
            </v-toolbar>
            <v-card-title primary-title>
              <div height="100%">
                <h4>{{ eventBody.title}}</h4>
                <p> {{ eventBody.content }} </p>
                <p> {{ eventBody.date }} </p>
              </div>
            </v-card-title>
          </v-container>
          <v-card-actions>
            <v-btn @click="clearEvent()"> clear </v-btn>
          </v-card-actions>
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
    eventDetails: {},
  }),

  methods: {
    clickedEvent: function(event) {
      this.eventDetails = event
    },
    clearEvent: function(){
      this.eventDetails = {}
    }
  },

  computed: {
    events: function(){
      return CalendarEvents.getEventsByDate(this.date)
    },
    eventBody: function(){
      return this.eventDetails
    }
  },
 
  mounted() {
    this.eventDatesArr = CalendarEvents.eventDates
  },
   updated() {
    this.selectedDate = this.date
  },
};
</script>