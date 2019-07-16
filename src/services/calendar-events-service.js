
let events = [
	{
		title: "Event one",
		content: "Event One's content",
		date: "2019-07-16"
	},
	{
		title: "Event Two",
		content: "Event Two's content",
		date: "2019-07-17"
	},
	{
		title: "Event Three",
		content: "Event One's content",
		date: "2019-07-18"
	}
];
let eventDates = events.map(event => event.date)

export default {
	getEventsByDate(calendarDate) {
		let eventsOnADay = events.filter(event => {
			return event.date == calendarDate;
		});
		console.log("The events on this day are: ", eventsOnADay);
		return eventsOnADay;
	},
	eventDates
};
