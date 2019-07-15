<template>
  <v-layout row wrap pa-3>
    <v-flex xs12 sm12 md4>
      <v-date-picker
        ref="picker"
        v-model="date"
        full-width
        :picker-date.sync="pickerDate"
        :event-color="date => date[9] % 2 ? 'red' : 'green'"
        :events="eventsFunction"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm12 md4 pl-3>
      <v-card>
        <v-container>
          <div class="title">Date Events: ({{ pickerDate || 'change month...' }})</div>
          <div class="subheading">Select date to see other events</div>
          <ul class="ma-3">
            <li v-for="note in notes" :key="note">{{ note }}</li>
          </ul>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md4 pl-3>
      <v-card>
        <v-container>
          <div class="title">Event Details</div>
          <div class="subheading">Event title</div>
          <ul class="ma-3">
            <li v-for="note in notes" :key="note">{{ note }}</li>
          </ul>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    pickerDate: null,
    notes: [],
    allNotes: [
      "President met with prime minister",
      "New power plant opened",
      "Rocket launch announced",
      "Global warming discussion cancelled",
      "Company changed its location"
    ]
  }),

  watch: {
    pickerDate(val) {
      this.notes = [
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)]
      ].filter((value, index, self) => self.indexOf(value) === index);
    }
  },

  methods: {
    eventsFunction(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    }
  },

  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  }
};
</script>