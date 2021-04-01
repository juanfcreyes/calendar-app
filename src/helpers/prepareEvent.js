import moment from "moment";

export const prepareEvent = (events = []) => {
    return events.map(event => ({
        ...event,
        end: moment(event.end).toDate(),
        start: moment(event.start).toDate()
    }));
};