const getEventsUserID = (userId) => {
    let events = localStorage.getItem('events');
    if (!events) {
        const res = setupInitialEvents();
        return res.filter(event => event.userId === userId);
    } else {
        events = JSON.parse(events);
        return events.filter(event => event.userId === userId);
    }
};

const getGenericEvents = () => {
    let events = localStorage.getItem('events');
    if (!events) {
        const res = setupInitialEvents();
        return res.filter(event => !event.userId);
    } else {
        events = JSON.parse(events);
        return events.filter(event => !event.userId);
    }
};

const setupInitialEvents = () => {
    const initialEvents = [
        { id: 1, userId: null, title: 'Team Meeting', startDate: '2026-07-01T10:00:00', endDate: '2026-07-01T11:00:00', description: 'Monthly team sync-up meeting.' },
        { id: 2, userId: null, title: 'Project Deadline', startDate: '2026-07-15T23:59:00', endDate: '2026-07-15T23:59:00', description: 'Final submission of the project deliverables.' },
        { id: 3, userId: 1, title: 'Doctor Appointment', startDate: '2026-07-05T14:30:00', endDate: '2026-07-05T15:00:00', description: 'Routine health check-up.' },
        { id: 4, userId: 1, title: 'Birthday Party', startDate: '2026-07-20T19:00:00', endDate: '2026-07-20T22:00:00', description: 'Celebrating at home with friends and family.' },
        { id: 5, userId: null, title: 'Webinar on Productivity', startDate: '2026-07-10T16:00:00', endDate: '2026-07-10T17:30:00', description: 'Join us for a webinar on improving productivity.' },
    ];
    localStorage.setItem('events', JSON.stringify(initialEvents));
    return initialEvents;
}

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

const getEventsUpcoming = (userId) => {
    const now = new Date();
    if (userId === null) {
        const events = getGenericEvents();
        return {success: true, events: events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).filter(event => new Date(event.startDate) >= now).splice(0, 3)};
    }
    const events = getEventsUserID(userId);
    return {success: true, events: events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).filter(event => new Date(event.startDate) >= now).splice(0, 3)};
}

export { getEventsUserID, getGenericEvents, createEvent, deleteEvent, updateEvent, getEventsUpcoming };