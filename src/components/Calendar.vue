<template>
  <v-row class="pa-3 pb-5">
    <v-card class="mt-3 mx-auto">
      <v-sheet class="v-sheet--offset mx-auto" color="cyan" max-width="calc(100% - 32px)" dark>
        <v-date-picker
          v-model="date"
          full-width
          :events="eventDatesArr"
          event-color="teal"
          color="purple"
          :landscape="!$vuetify.breakpoint.xs?true:false"
        ></v-date-picker>
      </v-sheet>
      <v-list three-line>
        <v-subheader>This Month</v-subheader>
        <template v-for="(event, index) in events">
          <v-list-item :to="'#'" :key="event.title">
            <v-list-item-avatar size="60">
              <v-row no-gutters>
                <v-col cols="12" md="12">
                  <div
                    class="heading font-weight-bold custom-font-family purple--text"
                  >{{event.date}}</div>
                </v-col>
                <v-col cols="12" md="12">
                  <div class="purple--text">{{event.day}}</div>
                </v-col>
              </v-row>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="custom-font-family font-weight-light"
                :class="{'title': !$vuetify.breakpoint.xs, 'mobile-title': $vuetify.breakpoint.xs}"
              >{{event.title}}</v-list-item-title>
              <v-list-item-subtitle
                class="subheading custom-font-family font-weight-light grey--text"
              >{{event.location}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index + 1 < events.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import CalendarEvents from "@/services/calendar-events-service.js";

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    selectedDate: "",
    eventDatesArr: null,
    eventDetails: {},
    events: [
      {
        day: "Wed",
        date: "3",
        title: "Presentation for mechanical engineering students",
        location: "Cedat conference hall"
      },
      {
        day: "Mon",
        date: "8",
        title: "Presentation for civil engineering students",
        location: "Cedat conference hall"
      },
      {
        day: "Fri",
        date: "19",
        title: "Viva",
        location: "Cedat conference hall"
      },
      {
        day: "Tue",
        date: "23",
        title: "Presentation for electrical engineering students",
        location: "Cedat conference hall"
      },
      {
        day: "Mon",
        date: "29",
        title: "Presentation for computer engineering students",
        location: "Cedat conference hall"
      }
    ]
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
    // events: function() {
    //   return CalendarEvents.getEventsByDate(this.date);
    // },
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
.calendar-card {
  border: 1px solid #e0e0e0 !important;
}
.mobile-title {
  flex: 1 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal !important;
}
</style>
