<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card elevation="4">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold">Marking</v-card-title>
        </v-row>
        <v-card-text>
          <div class="text-xs-center">
            <v-row align="center" justify="center" no-gutters>
              <v-col>
                <div class="text-center">
                  <h1 class="report-score teal--text ml-5">{{ markedReports }}</h1>
                </div>
              </v-col>
              <v-col>
                <div class="text-center">
                  <v-icon>mdi-slash-forward</v-icon>
                </div>
              </v-col>
              <v-col>
                <div class="text-center">
                  <h1 class="report-score red--text mr-5">{{ unmarkedReports }}</h1>
                </div>
              </v-col>
            </v-row>
            <v-row class="pt-3" no-gutters>
              <v-col cols="12">
                <h3 class="text-center">out of</h3>
              </v-col>
              <v-col cols="12">
                <h2 class="blue--text text-center">{{ totalReports() }}</h2>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card elevation="24" color="teal">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold">Reports Received</v-card-title>
        </v-row>
        <v-card-text>
          <div class="text-xs-center">
            <v-row align="center" justify="center" class="py-2">
              <v-col cols="5">
                <div class="text-center">
                  <h1 class="report-score">{{ reportsReceived }}</h1>
                </div>
              </v-col>
              <v-col cols="2">
                <div class="text-center">
                  <v-icon large>mdi-slash-forward</v-icon>
                </div>
              </v-col>
              <v-col cols="5">
                <div class="text-center">
                  <h1 class="report-score">{{ studentsAssigned }}</h1>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "report-score",
  data() {
    return {
      markedReports: "45",
      unmarkedReports: "15",
      total: "",
      reportsReceived: "60",
      studentsAssigned: "78",
    };
  },
  methods: {
    totalReports() {
      return (this.total = String(
        parseInt(this.markedReports) + parseInt(this.unmarkedReports)
      ));
    },
  },
};
</script>
<style>
.report-score {
  font-size: 3rem;
}
</style>