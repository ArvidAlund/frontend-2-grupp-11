const getEventsUserID = (userId) => {
    let events = localStorage.getItem('events');
    if (!events) {
        return [];
    } else {
        events = JSON.parse(events);
        return events.filter(event => event.userId === userId);
    }
};

const getGenericEvents = () => {
    let events = localStorage.getItem('events');
    if (!events) {
        return [];
    } else {
        events = JSON.parse(events);
        return events.filter(event => !event.userId);
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
        userId: userId ? userId : null,
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
        return { success: false, message: "No events found." };
    }

    events = JSON.parse(events);

    let eventIndex;
    if (userId) {
        eventIndex = events.findIndex(event => event.id === eventId && event.userId === userId);
    } else {
        eventIndex = events.findIndex(event => event.id === eventId && !event.userId);
    }

    if (eventIndex === -1) {
        return { success: false, message: "Event not found." };
    }

    events.splice(eventIndex, 1);
    localStorage.setItem('events', JSON.stringify(events));

    return { success: true, events };
};

const updateEvent = (updatedEvent) => {
    console.log("Updating event:", updatedEvent);
    let events = localStorage.getItem('events');
    if (!events) {
        return { success: false, message: "No events found." };
    }
    events = JSON.parse(events);

    const eventIndex = events.findIndex(event => event.id === updatedEvent.id);
    if (eventIndex === -1) {
        return { success: false, message: "Event not found." };
    }

    events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
    localStorage.setItem('events', JSON.stringify(events));
    return { success: true, events };
};

export { getEventsUserID, getGenericEvents, createEvent, deleteEvent, updateEvent };