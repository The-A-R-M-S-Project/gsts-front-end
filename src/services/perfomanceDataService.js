let engineering = {
	ece: {
		type: "horizontalBar",
		data: {
			datasets: [
				{
					label: "Perfomance",
					data: [10, 20, 20, 12, 4, 2],
					backgroundColor: [
						"#2196F3",
						"#2196F3",
						"#2196F3",
						"#2196F3",
						"#2196F3",
						"#2196F3"
					]
				}
			],
			labels: ["A", "B", "C", "D", "E", "F"]
		},
		options: {
			title: {
				display: true,
				text: "Electrical and Computer",
				fontSize: 12
			},
			responsive: true,
			legend: {
				display: false,
				position: "bottom",
				labels: {
					boxWidth: 12
				}
			},
			scales: {
				yAxes: [
					{
						gridLines: {
							display: false
						}
					}
				],
				xAxes: [
					{
						gridLines: {
							drawBorder: false
						}
					}
				]
			}
		}
	},
	mec: {
		type: "horizontalBar",
		data: {
			datasets: [
				{
					label: "Perfomance",
					data: [8, 28, 41, 22, 1, 1],
					backgroundColor: [
						"#009688",
						"#009688",
						"#009688",
						"#009688",
						"#009688",
						"#009688"
					]
				}
			],
			labels: ["A", "B", "C", "D", "E", "F"]
		},
		options: {
			title: {
				display: true,
				text: "Mechanical",
				fontSize: 12
			},
			responsive: true,
			legend: {
				display: false,
				position: "bottom",
				labels: {
					boxWidth: 12
				}
			}
		}
	},
	civ: {
		type: "horizontalBar",
		data: {
			datasets: [
				{
					label: "Perfomance",
					data: [15, 40, 20, 10, 2, 1],
					backgroundColor: [
						"#9C27B0",
						"#9C27B0",
						"#9C27B0",
						"#9C27B0",
						"#9C27B0",
						"#9C27B0"
					]
				}
			],
			labels: ["A", "B", "C", "D", "E", "F"]
		},
		options: {
			title: {
				display: true,
				text: "Civil and Environmental",
				fontSize: 12
			},
			responsive: true,
			legend: {
				display: false,
				position: "bottom",
				labels: {
					boxWidth: 12
				}
			}
		}
	}
};

export { engineering };
