<template>
    <v-layout row wrap>
        <v-flex sm12 md4><canvas id="pieChart"></canvas></v-flex>
        <v-flex sm12 md4><canvas id="pieChart2"></canvas></v-flex>
        <v-flex sm12 md4><canvas id="pieChart3"></canvas></v-flex>
    </v-layout>   
</template>
<script>
import Chart from 'chart.js'
import { engineering } from '@/services/perfomanceDataService.js'
export default {
    data() {
        return{
            chartData1: engineering.ece,
            chartData2: engineering.mec,
            chartData3: engineering.civ
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
        this.createChart('pieChart', this.chartData1)
        this.createChart('pieChart2',this.chartData3)
        this.createChart('pieChart3',this.chartData2)
    }
}
</script>
