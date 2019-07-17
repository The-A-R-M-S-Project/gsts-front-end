let engineering = {
        ece: {
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
                    text: 'Electrical and Computer',
                    fontSize: 12,
                },
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                    }
                },

            }
        },
        mec: {
            type: 'pie',
            data: {
                datasets: [{
                    label: 'Perfomance',
                    data: [8,28,41,22,1,1],
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
                    text: 'Mechanical',
                    fontSize: 12,
                },
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                    },
                },

            }
        },
        civ: {
            type: 'pie',
            data: {
                datasets: [{
                    label: 'Perfomance',
                    data: [15, 40,20,10,2,1],
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
                    text: 'Civil and Environmental',
                    fontSize: 12,
                },
                responsive: true,
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                    }
                },

            }
        }
    }

export { engineering }