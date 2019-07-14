<template>
    <v-layout row wrap>
        <v-flex sm12 md4><canvas id="pieChart"></canvas></v-flex>
        <v-flex sm12 md4><canvas id="pieChart2"></canvas></v-flex>
        <v-flex sm12 md4><canvas id="pieChart3"></canvas></v-flex>
    </v-layout>   
</template>
<script>
import Chart from 'chart.js'
export default {
    data() {
        return{
            chartData: {
                type: 'pie',
                data: {
                    datasets: [{
                        label: 'Perfomance',
                        data: [10, 20,20,12,4,2],
                        backgroundColor: [
                            '#FF00FF',
                            '#00FF00',
                            '#00FFFF',
                            '#FFA500',
                            '#FF0000',
                            '#800000'
                        ],
                    }],
                    labels: ['A','B','C','D','E','F'],
                },    
                options: {
                    title: {
                        display: true,
                        text: 'Department Name',
                        fontSize: 18,
                        defaultFontFamily: "'Comfortaa', cursive"
                    },
                    responsive: true,
                    legend: {
                        display: false
                    },

                }
            },
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
        this.createChart('pieChart', this.chartData)
        this.createChart('pieChart2',this.chartData)
        this.createChart('pieChart3',this.chartData)
    }
}
</script>
