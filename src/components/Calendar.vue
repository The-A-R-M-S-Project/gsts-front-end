<template>
  <v-layout column wrap pa-3>
    <v-flex xs12>
      <v-card class="mt-3 mx-auto calendar-card" flat>
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
        <v-list three-line>
          <template>
            <v-subheader class="title custom-font-family font-weight-medium">This Month</v-subheader>
            <v-divider></v-divider>
            <v-list-tile :to="'#'" pt-4>
              <v-list-tile-avatar>
                <v-layout column>
                  <v-flex>
                    <div class="display-1 custom-font-family purple--text">24</div>
                  </v-flex>
                  <v-flex>
                    <div class="purple--text">Wed</div>
                  </v-flex>
                </v-layout>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div
                    class="title custom-font-family font-weight-light mb-2"
                  >Presentations for mechanical Students</div>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div
                    class="subheading custom-font-family font-weight-light grey--text"
                  >In Cedat conference hall</div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile :to="'#'">
              <v-list-tile-avatar>
                <v-layout column>
                  <v-flex>
                    <div class="display-1 custom-font-family teal--text">25</div>
                  </v-flex>
                  <v-flex>
                    <div class="teal--text">Thur</div>
                  </v-flex>
                </v-layout>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div
                    class="title custom-font-family font-weight-light mb-2"
                  >Presentations for mechanical Students</div>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div
                    class="subheading custom-font-family font-weight-light grey--text"
                  >In Cedat conference hall</div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile :to="'#'">
              <v-list-tile-avatar>
                <v-layout column>
                  <v-flex>
                    <div class="display-1 custom-font-family blue--text">26</div>
                  </v-flex>
                  <v-flex>
                    <div class="blue--text">Fri</div>
                  </v-flex>
                </v-layout>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="title custom-font-family font-weight-light mb-2">Viva Presentations</div>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div
                    class="subheading custom-font-family font-weight-light grey--text"
                  >In Cedat conference hall</div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile :to="'#'">
              <v-list-tile-avatar>
                <v-layout column>
                  <v-flex>
                    <div class="display-1 custom-font-family purple--text">28</div>
                  </v-flex>
                  <v-flex>
                    <div class="purple--text">Mon</div>
                  </v-flex>
                </v-layout>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div
                    class="title custom-font-family font-weight-light mb-2"
                  >Presentations for Electrical Students</div>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div
                    class="subheading custom-font-family font-weight-light grey--text"
                  >In Cedat conference hall</div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
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
.calendar-card {
  border: 1px solid #e0e0e0 !important;
}
</style>
