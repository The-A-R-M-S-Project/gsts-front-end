<template>
  <div
    class="responsive-report"
    :class="
      $vuetify.breakpoint.xs
        ? 'mobile-report'
        : $vuetify.breakpoint.sm
        ? 'tablet-report'
        : 'desktop-report'
    "
  >
    <canvas id="barChart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "VivaStatus",
  data() {
    return {
      chartData: {
        type: "bar",
        options: chartOptions,
      },
    };
  },
  mounted() {
    this.createChart("barChart", this.chartData);
  },
  computed: {
    reportStatus() {
      return this.$store.getters.reportStats;
    },
  },
  methods: {
    createChart(chartId, chartData) {
      let values = this.reportStatus.map((obj) => {
        return Object.values(obj);
      });
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          // labels: [keys[0][0], keys[1][0], keys[2][0]],
          labels: this.determineLabel(),
          datasets: [
            {
              label: "Submitted",
              backgroundColor: "#9C27B0",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              //   data: [
              //     values[0][0].submitted,
              //     values[1][0].submitted,
              //     values[2][0].submitted
              //   ]
              data: [10, 4, 3],
            },
            {
              label: "With examiner",
              backgroundColor: "#2196F3",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              //   data: [
              //     values[0][0].withExaminer,
              //     values[1][0].withExaminer,
              //     values[2][0].withExaminer
              //   ]
              data: [17, 15, 12],
            },
            {
              label: "Cleared",
              backgroundColor: "#009688",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              // data: [
              //   values[0][0].cleared,
              //   values[1][0].cleared,
              //   values[2][0].cleared
              // ],
              data: [8, 7, 6],
            },
          ],
        },
        options: chartData.options,
      });
    },
    determineLabel() {
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      let keys = this.reportStatus.map((obj) => {
        return Object.keys(obj);
      });
      let shortNames = {
        "Geomatics and Land Management": "GLM",
        "Architecture and Physical planning": "APP",
        "Construction Economics and Management": "CEM",
        "Electrical and Computer Engineering": "ECE",
        "Mechanical Engineering": "ME",
        "Civil and Environmental Engineering": "CEE",
      };
      if (vw < 960) {
        return [
          shortNames[`${keys[0][0]}`],
          shortNames[`${keys[1][0]}`],
          shortNames[`${keys[2][0]}`],
        ];
      } else {
        return [keys[0][0], keys[1][0], keys[2][0]];
      }
    },
  },
};

let chartOptions = {
  maintainAspectRatio: false,
  defaultFontFamily: "Comfortaa",
  legend: {
    position: "bottom",
    align: "center",
    labels: {
      usePointStyle: true,
      padding: 5,
    },
  },
  layout: {
    padding: {
      left: 15,
      right: 20,
      top: 5,
      bottom: 5,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          drawBorder: false,
          lineWidth: 0.5,
          tickMarkLength: 15,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
          tickMarkLength: 15,
        },
      },
    ],
  },
};
</script>

<style>
.responsive-report {
  position: relative;
}
.desktop-report {
  height: 57vh !important;
}
.tablet-report {
  height: 69vh !important;
}
.mobile-report {
  height: 50vh !important;
}
</style>