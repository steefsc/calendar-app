import * as actionTypes from './actions';

export const addCalendarEvent = (day, event) => {
    return {
        type: actionTypes.ADD_CALENDAR_EVENT,
        event,
        day
    };
};

export const updateCalendarEvent = (day, event) => {
    return {
        type: actionTypes.UPDATE_CALENDAR_EVENT,
        event,
        day
    };
};

export const removeCalendarEvent = (day, event) => {
    return {
        type: actionTypes.REMOVE_CALENDAR_EVENT,
        event,
        day
    };
};


export const removeAllCalendarEvents = (day) => {
    return {
        type: actionTypes.REMOVE_ALL_CALENDAR_EVENT,
        day
    };
};


export const openDayEvents = (dateKey, events) => {
    return {
        type: actionTypes.OPEN_DAY_EVENTS,
        dateKey: dateKey,
        events: events
    }
}


export const onChangeMonthsCounter = (value) => {
    return {
        type: actionTypes.CHANGE_MONTH,
        value: value
    }
}