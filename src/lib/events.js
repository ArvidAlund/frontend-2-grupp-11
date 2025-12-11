const getEventsUserID = (userId) => {
    let events = localStorage.getItem('events');
    if (!events) {
        return [];
    } else {
        events = JSON.parse(events);
        return events.filter(event => event.userId === userId);
    }
};

const createEvent = (userId, title, startDate, endDate, description) => {
    let events = localStorage.getItem('events');
    if (!events) {
        events = [];
    } else {
        events = JSON.parse(events);
    }
    const newEvent = {
        id: events.length + 1,
        userId,
        title,
        startDate,
        endDate,
        description
    };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return {success: true, id: newEvent.id};
}

const deleteEvent = (eventId, userId) => {
    let events = localStorage.getItem('events');
    if (!events) {
        return {success: false, message: "No events found."};
    }
    events = JSON.parse(events);
    const eventIndex = events.findIndex(event => event.id === eventId && event.userId === userId);
    if (eventIndex === -1) {
        return {success: false, message: "Event not found."};
    }
    events.slice(eventIndex, 1);
    localStorage.setItem('events', JSON.stringify(events));
    return {success: true};
};


export { getEventsUserID, createEvent, deleteEvent };