<template>
    <canvas id="barChart"></canvas>    
</template>
<script>
import Chart from 'chart.js'
let barChartData = {
  labels: [
    "Electrical and Computer",
    "Civil and Environmental",
    "Mechanical",
  ],
  datasets: [
    {
      label: "submitted",
      backgroundColor: "pink",
      borderColor: "red",
      borderWidth: 1,
      data: [3, 5, 6]
    },
    {
      label: "With examiner",
      backgroundColor: "lightblue",
      borderColor: "blue",
      borderWidth: 1,
      data: [4, 7, 3]
    },
    {
      label: "Cleared",
      backgroundColor: "lightgreen",
      borderColor: "green",
      borderWidth: 1,
      data: [10,7,4,]
    },
    ]};

let chartOptions = {
  responsive: true,
  legend: {
    position: "top"
  },
  title: {
    display: true,
    text: "Report Status"
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
export default {
    name: 'VivaStatus',
    data() {
        return{
            chartData: {
                type: 'bar',
                data: barChartData,    
                options: chartOptions,
            }
        }
    },
    methods: {
        createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
        });
    }},
    mounted() {
        this.createChart('barChart', this.chartData)
    }
}
</script>
