import { types } from "../types/types";

const initialState = {
    events: [],
    active: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                active: {...action.payload}
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, {...action.payload}]
            };
        case types.eventClearActive:
            return {
                ...state,
                active: null
            };
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map((event) => 
                    event.id === action.payload.id ? action.payload : event 
                )
            };
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter((event) => 
                    event.id !== state.active.id 
                ),
                active: null
            };
        case types.eventLoaded:
            return {
                ...state,
                events: action.payload
            };
        case types.eventClean:
            return {
                ...state,
                events: [],
                active: null
            };
        default:
            return state;
    }
};