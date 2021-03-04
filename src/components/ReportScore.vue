<template>
  <v-row>
    <v-col cols="12" class="pt-0">
      <v-card elevation="4">
        <v-row>
          <v-card-title class="mx-auto font-weight-bold"
            >Assigned students</v-card-title
          >
        </v-row>
        <v-card-text class="pt-0">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="5" sm="3">
              <div class="text-center">
                <p class="display-4 blue--text font-weight-medium">
                  {{ assignedStudents.length }}
                </p>
              </div>
            </v-col>
            <v-col cols="7" sm="9">
              <div class="text-xs-center marking-chart">
                <canvas id="levelsChart"></canvas>
              </div>
            </v-col>
          </v-row>
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
      },
      statusOrder: [
        "notSubmitted",
        "submitted",
        "assignedToExaminers",
        "receivedByExaminers",
        "clearedByExaminers",
        "vivaDateSet",
        "vivaComplete",
        "pendingRevision",
        "complete",
      ],
    };
  },
  mounted() {
    this.createDoughnutChart("markingDonutChart", this.chartData);
    this.createDoughnutChart("receivedDonutChart", this.chartData);
    this.createDoughnutChart("levelsChart", this.chartData);
  },
  computed: {
    assignedStudents() {
      let reports = this.$store.getters.assignedStudents;
      return reports.map((assignedStudent) => {
        return assignedStudent.report;
      });
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
    studentsPerLevel() {
      let eventualResult = [];
      let studentsPerLevel = this.assignedStudents.reduce((result, report) => {
        let key = report.status;
        let newReport = {
          _id: report._id,
        };
        if (result[key]) result[key].push(newReport);
        else result[key] = [newReport];
        return result;
      }, {});
      let statuses = {
        notSubmitted: {
          message: "Not submitted",
          color: "#9E9E9E",
        },
        submitted: {
          message: "Submitted",
          color: "#2196F3",
        },
        assignedToExaminers: {
          message: "Assigned to examiners",
          color: "#E64A19",
        },
        receivedByExaminers: {
          message: "Received by examiners",
          color: "#F4511E",
        },
        clearedByExaminers: {
          message: "Cleared by examiners",
          color: "#FF9800",
        },
        vivaDateSet: {
          message: "Viva date set",
          color: "#E91E63",
        },
        vivaComplete: {
          message: "Viva complete",
          color: "#FFC107",
        },
        pendingRevision: {
          message: "Pending revision",
          color: "#FDD835",
        },
        complete: {
          message: "Pending revision",
          color: "#81C784",
        },
      };
      for (const [key, value] of Object.entries(studentsPerLevel)) {
        eventualResult.push({
          level: statuses[`${key}`].message,
          number: value.length,
          color: statuses[`${key}`].color,
        });
      }
      return eventualResult;
    },
  },
  methods: {
    createDoughnutChart(chartId, chartData) {
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
          labels: ["Cleared", "Uncleared"],
        };
      } else if (chartId === "receivedDonutChart") {
        chartConfig = {
          datasets: [
            {
              label: "Received reports",
              data: [this.receivedReports, unreceivedReports],
              backgroundColor: ["teal", "#E91E63"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: ["Received", "Not received"],
        };
      } else {
        let dataPoints = [];
        let colors = [];
        let levels = [];
        this.studentsPerLevel.forEach((report) => {
          dataPoints.push(report.number);
          colors.push(report.color);
          levels.push(report.level);
        });
        chartConfig = {
          datasets: [
            {
              label: "Students per level",
              data: dataPoints,
              backgroundColor: colors,
              borderWidth: [0, 0, 0, 0],
            },
          ],
          labels: levels,
        };
      }
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartConfig,
        options: {
          maintainAspectRatio: false,
          legend: {
            position: "bottom",
            labels: {
              fontColor: "black",
              fontSize: 14,
              fontFamily: "Roboto",
              padding: 8,
            },
          },
          cutoutPercentage: chartId === "levelsChart" ? 0 : 70,
        },
      });
    },
  },
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