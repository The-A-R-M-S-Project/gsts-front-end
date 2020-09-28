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
            <p class="display-4 blue--text font-weight-medium">60</p>
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
      markedReports: "45",
      unmarkedReports: "15",
      total: "",
      reportsReceived: "60",
      studentsAssigned: "78",
      chartData: {
        type: "doughnut",
        options: chartOptions,
      },
    };
  },
  mounted() {
    this.createChart("markingDonutChart", this.chartData);
    this.createChart("receivedDonutChart", this.chartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      let chartConfig = {};
      if (chartId === "markingDonutChart") {
        chartConfig = {
          datasets: [
            {
              label: "Marking",
              data: [37, 23],
              backgroundColor: ["teal", "#E91E63"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: ["Cleared (37)", "Uncleared (23)"],
        };
      } else {
        chartConfig = {
          datasets: [
            {
              label: "Received reports",
              data: [60, 15],
              backgroundColor: ["teal", "#E91E63"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: ["Received (60)", "Not received (15)"],
        };
      }
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartConfig,
        options: chartData.options,
      });
    },
    totalReports() {
      return (this.total = String(
        parseInt(this.markedReports) + parseInt(this.unmarkedReports)
      ));
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