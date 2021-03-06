import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDeleted } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    
    const handleOnClick = () => {
        dispatch(eventStartDeleted());
    }

    return (
        <button className='btn btn-danger fab-danger' onClick={handleOnClick}>
            <i className='fas fa-trash'></i>
        </button>
    )
}
