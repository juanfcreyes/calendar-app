import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import { eventStartAddNew, eventClearActive, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
if (process.env.NODE_ENV !== 'test') {
    Modal.setAppElement('#root');
}

const dateStart = moment().minute(0).seconds(0).add(1,'hours');
const dateEnd = moment().minute(0).seconds(0).add(2,'hours');

const initEvent = {
    title: '',
    notes: '',
    start: dateStart.toDate(),
    end: dateEnd.toDate()
}

export const CalendarModal = () => {
    
    const [titleValid, setTitleValid] = useState(false);
    const [formValues, setFormValues] = useState(initEvent);
    const {notes, title, start, end} = formValues;
    const dispatch = useDispatch();

    const ui = useSelector(state => state.ui);
    const {active} = useSelector(state => state.calendar);
   
    const afterOpenModal = () => {
        if(active) {
            setFormValues(active); 
        } else {
            setFormValues(initEvent);
        }
    }
    
    useEffect(() => {
        if(active) {
            setFormValues(active); 
        } else {
            setFormValues(initEvent);
        }
    }, [active]);

    
    const close = () => {
        dispatch(closeModal());
        dispatch(eventClearActive());
    };

    const onChangeStart = (value) => {
        setFormValues({
            ...formValues,
            start: value
        });
    };

    const onChangeEnd = (value) => {
        setFormValues({
            ...formValues,
            end: value
        })
    };

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);
        setTitleValid(true);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'The end event time must be greater than the start event time', 'error')
            return; 
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        if (active) {
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew({
                ...formValues
            }));
        }
        close();
    };

    return ( 
        <Modal
            isOpen={ui.modalOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={close}
            style={customStyles}
            closeTimeoutMS={200}
            contentLabel="Example Modal"
            className='modal'
            overlayClassName='modal-fondo'
            ariaHideApp={process.env.NODE_ENV !== 'test'}
        >
            <h1> {active ? 'Editar evento' : 'Nuevo evento' }  </h1>
            <hr />
            <form className="container" onSubmit={handleOnSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker onChange={onChangeStart} value={start} className="form-control"/>
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker onChange={onChangeEnd} value={end} minDate={start} className="form-control" />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit" 
                    className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}