<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <v-card elevation="4">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold"
            >Assigned students</v-card-title
          >
        </v-row>
        <v-card-text>
          <div class="text-center">
            <p class="display-4 blue--text font-weight-medium">
              {{ assignedStudents.length }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card elevation="4">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold">Marking</v-card-title>
        </v-row>
        <v-card-text>
          <div class="text-xs-center marking-chart">
            <canvas id="markingDonutChart"></canvas>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="6">
      <v-card elevation="4">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold"
            >Reports Received</v-card-title
          >
        </v-row>
        <v-card-text>
          <div class="text-xs-center marking-chart">
            <canvas id="receivedDonutChart"></canvas>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Chart from "chart.js";
export default {
  name: "report-score",
  data() {
    return {
      chartData: {
        type: "doughnut",
        options: chartOptions,
      },
      statusOrder: [
        "notSubmitted",
        "submitted",
        "withExaminer",
        "clearedByExaminer",
        "vivaDateSet",
        "vivaComplete",
      ],
    };
  },
  mounted() {
    this.createChart("markingDonutChart", this.chartData);
    this.createChart("receivedDonutChart", this.chartData);
  },
  computed: {
    assignedStudents() {
      return this.$store.getters.assignedStudents;
    },
    receivedReports() {
      let receivedReports = this.assignedStudents.filter((report) => {
        return this.statusOrder.indexOf(report.status) > 1;
      });
      return receivedReports.length;
    },
    clearedReports() {
      let receivedReports = this.assignedStudents.filter((report) => {
        return this.statusOrder.indexOf(report.status) > 1;
      });
      let clearedReports = receivedReports.filter((report) => {
        return this.statusOrder.indexOf(report.status) > 2;
      });
      return clearedReports.length;
    },
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      let chartConfig = {};
      let unreceivedReports =
        this.assignedStudents.length - this.receivedReports;
      let unclearedReports = this.receivedReports - this.clearedReports;
      if (chartId === "markingDonutChart") {
        chartConfig = {
          datasets: [
            {
              label: "Marking",
              data: [this.clearedReports, unclearedReports],
              backgroundColor: ["teal", "#E91E63"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: [
            `Cleared (${this.clearedReports})`,
            `Uncleared (${unclearedReports})`,
          ],
        };
      } else {
        chartConfig = {
          datasets: [
            {
              label: "Received reports",
              data: [this.receivedReports, unreceivedReports],
              backgroundColor: ["teal", "#E91E63"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: [
            `Received (${this.receivedReports})`,
            `Not received (${unreceivedReports})`,
          ],
        };
      }
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartConfig,
        options: chartData.options,
      });
    },
  },
};
const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    position: "bottom",
    labels: {
      fontColor: "black",
      fontSize: 15,
    },
  },
  cutoutPercentage: 70,
};
</script>
<style>
.report-score {
  font-size: 3rem;
}
.marking-chart {
  height: 30vh !important;
}
</style>