import { mount } from "enzyme/build";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import moment from "moment";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import { eventClearActive, eventStartAddNew, eventStartUpdate } from "../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

jest.mock("../../../actions/events", () => ({
    eventStartUpdate: jest.fn(), 
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('sweetalert2', () =>  ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mocktore = configureStore(middlewares);

const dateStart = moment().minute(0).seconds(0).add(1,'hours');
const dateEnd = moment().minute(0).seconds(0).add(2,'hours');
const initEvent = {
    title: 'New Event',
    notes: 'Some notes ',
    start: dateStart.toDate(),
    end: dateEnd.toDate()
}

const initialState = {
    calendar: {
        events: [],
        active: initEvent
    },
    auth: {
        user: {
            uid: '123456',
            name: 'test'
        }
    },
    ui: {
        modalOpen: true
    }
};
const store = mocktore(initialState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();


describe('Pruebas sobre CalendarModal', () => {

    const wrapper = mount(<Provider store={store}>
        <CalendarModal ></CalendarModal>
    </Provider>)

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe mostrarse el modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);        
    });

    test('Debe de llamar la accion de actualizar y cerrar modal', () => {
       wrapper.find('form').simulate('submit', {
           preventDefault: () => {}
       });
       expect(eventStartUpdate).toHaveBeenCalledWith(initialState.calendar.active);
       expect(eventClearActive).toHaveBeenCalled();
    });

    test('Debe de mostrar error si falta el titulo', () => {
        
        const initialState = {
            calendar: { events: [], active: null},
            auth: {
                user: {
                    uid: '123456',
                    name: 'test'
                }
            },
            ui: { modalOpen: true }
        };
        const store = mocktore(initialState);
        const wrapper = mount(<Provider store={store}>
            <CalendarModal ></CalendarModal>
        </Provider>)
        
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        }); 
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    });

    test('Debe crear un nuevo evento', () => {
        const initialState = {
            calendar: { events: [], active: null},
            auth: {
                user: {
                    uid: '123456',
                    name: 'test'
                }
            },
            ui: { modalOpen: true }
        };
        const store = mocktore(initialState);
        store.dispatch = jest.fn();
        const wrapper = mount(<Provider store={store}>
            <CalendarModal ></CalendarModal>
        </Provider>)

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Fin del curso'
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        }); 

        expect(eventStartAddNew).toHaveBeenCalledWith({
            title: 'Fin del curso',
            start: expect.anything(),
            end: expect.anything(),
            notes: ''
        });
        expect(eventClearActive).toHaveBeenCalled();
    });

    test('Debe de validar las fechas', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Fin del curso'
            }
        });
        const today = new Date();
        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(today);
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });       
        expect(Swal.fire).toHaveBeenCalled();    
    });
    
    

});
