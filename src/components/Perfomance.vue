<template>
  <v-layout wrap>
    <v-flex sm12 md4>
      <canvas id="electricalAndComputer"></canvas>
    </v-flex>
    <v-flex sm12 md4>
      <canvas id="civil"></canvas>
    </v-flex>
    <v-flex sm12 md4>
      <canvas id="mechanical"></canvas>
    </v-flex>
  </v-layout>
</template>
<script>
import Chart from "chart.js";
import { engineering } from "@/services/perfomanceDataService.js";
export default {
  data() {
    return {
      chartData1: engineering.ece,
      chartData2: engineering.mec,
      chartData3: engineering.civ
    };
  },
  methods: {
    createChart(chartId, chartData) {
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("electricalAndComputer", this.chartData1);
    this.createChart("civil", this.chartData3);
    this.createChart("mechanical", this.chartData2);
  }
};
</script>
