import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActive } from '../../actions/events';
import { openModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleOnClick = () => {
        dispatch(eventClearActive());
        dispatch(openModal());
    }

    return (
        <button className='btn btn-primary fab' onClick={handleOnClick}>
            <i className='fas fa-plus'></i>
        </button>
    )
}
