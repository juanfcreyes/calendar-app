import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/ui';
import { eventClearActive, eventSetActive, eventStartLoaded } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const calendar = useSelector(state => state.calendar);
    const auth = useSelector(state => state.auth);
    const events = calendar.events;

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(eventStartLoaded())
    }, [dispatch])

    const onDoubleClickEvent = (event) => {
        dispatch(openModal());
    };

    const onSelectEvent = (event) => {
        dispatch(eventSetActive(event));
    };

    const onViewChange = (view) => {
        setLastView(view);
        localStorage.setItem('lastView', view);
    }

    const onSelectSlot = () => {
        dispatch(eventClearActive());
    }

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: auth.user.uid === event.user._id ? '#347C7F' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <Navbar></Navbar>
            <Calendar
                onSelectEvent={onSelectEvent}
                onDoubleClickEvent={onDoubleClickEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={lastView}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal></CalendarModal>
            { calendar.active &&  <DeleteEventFab></DeleteEventFab> } 
            <AddNewFab></AddNewFab>
        </div>
    )
}
