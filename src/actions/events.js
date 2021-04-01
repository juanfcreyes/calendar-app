import Swal from "sweetalert2";
import {
    fetchWithToken
} from "../helpers/fetch";
import { prepareEvent } from "../helpers/prepareEvent";
import {
    types
} from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dipatch, getState) => {
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            const { user } = getState().auth;
            if (body.ok) {
                event.id = body.event.id
                event.user = { name: user.name, _id: user.uid};
                dipatch(eventAddNew(event));    
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const eventStartLoaded = () => {
    return async (dipatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            if (body.ok) {
                dipatch(eventLoaded(prepareEvent(body.events)));    
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const eventStartUpdate = (event) => {
    return async (dipatch, getState) => {
        const { user } = getState().auth;
        try {
            const resp = await fetchWithToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                event.user = user;
                dipatch(eventUpdated(body.event));    
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    }
};


export const eventStartDeleted = () => {
    return async (dipatch, getState) => {
        const { active } = getState().calendar;
        try {
            const resp = await fetchWithToken(`events/${active.id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dipatch(eventDeleted());    
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.error(error);
        }
    }
};


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventClean = () => ({
    type: types.eventClean
});