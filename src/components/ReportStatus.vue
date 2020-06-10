<template>
    <canvas id="barChart"></canvas>
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
        console.log("reportStatus: ", this.reportStatus);
        this.createChart("barChart", this.chartData);
    },
    computed: {
        reportStatus() {
            return this.$store.getters.reportStats;
        },
    },
    methods: {
        createChart(chartId, chartData) {
            let keys = this.reportStatus.map((obj) => {
                return Object.keys(obj);
            });
            let values = this.reportStatus.map((obj) => {
                return Object.values(obj);
            });
            Chart.defaults.global.defaultFontFamily = "Comfortaa";
            const ctx = document.getElementById(chartId);
            const myChart = new Chart(ctx, {
                type: chartData.type,
                data: {
                    labels: [keys[0][0], keys[1][0], keys[2][0]],
                    datasets: [
                        {
                            label: "submitted",
                            backgroundColor: "#9C27B0",
                            borderWidth: 0,
                            barPercentage: 0.7,
                            categoryPercentage: 0.3,
                            data: [
                                values[0][0].submitted,
                                values[1][0].submitted,
                                values[2][0].submitted,
                            ],
                        },
                        {
                            label: "With examiner",
                            backgroundColor: "#2196F3",
                            borderWidth: 0,
                            barPercentage: 0.7,
                            categoryPercentage: 0.3,
                            data: [
                                values[0][0].withExaminer,
                                values[1][0].withExaminer,
                                values[2][0].withExaminer,
                            ],
                        },
                        {
                            label: "Cleared",
                            backgroundColor: "#009688",
                            borderWidth: 0,
                            barPercentage: 0.7,
                            categoryPercentage: 0.3,
                            data: [
                                values[0][0].cleared,
                                values[1][0].cleared,
                                values[2][0].cleared,
                            ],
                        },
                    ],
                },
                options: chartData.options,
            });
        },
    },
};

let chartOptions = {
    responsive: true,
    defaultFontFamily: "Comfortaa",
    legend: {
        position: "bottom",
        align: "start",
        labels: {
            usePointStyle: true,
            padding: 20,
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
                    tickMarkLength: 5,
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
