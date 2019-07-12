<template>
    <canvas id="donutChart"></canvas>    
</template>
<script>
import Chart from 'chart.js'
export default {
    name: 'VivaStatus',
    data() {
        return{
            chartData: {
                type: 'doughnut',
                data: {
                    datasets: [{
                        label: 'Viva Status',
                        data: [10, 20],
                        backgroundColor: [
                            'rgba(165,105,189,1',
                            'rgba(232,218,239,1)'
                        ],
                    }],
                    labels: [
                        'done',
                        'pending'
                    ],
                },    
                options: {
                    title: {
                        display: true,
                        text: 'Viva Status',
                        fontSize: 20,
                        defaultFontFamily: "'Comfortaa', cursive"
                    },
                    responsive: true,
                    legend: {
                        position: 'bottom',
                    },
                    cutoutPercentage: 80

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
        this.createChart('donutChart', this.chartData)
    }
}
</script>
