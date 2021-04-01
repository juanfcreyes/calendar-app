import { mount } from "enzyme/build";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { types } from "../../../types/types";
import { act } from "@testing-library/react";

const middlewares = [thunk];
const mocktore = configureStore(middlewares);
const initialState = {
    calendar: {
        events: []
    },
    auth: {
        user: {
            uid: '123456',
            name: 'test'
        }
    },
    ui: {
        modalOpen: false
    }
};
const store = mocktore(initialState);
store.dispatch = jest.fn();
Storage.prototype.setItem = jest.fn();



describe('Pruebas sobre CalendarScreen', () => {

    const wrapper = mount(<Provider store={store}>
        <CalendarScreen ></CalendarScreen>
    </Provider>)
     
     test('Debe de mostrarse correctamente', () => {
       expect(wrapper).toMatchSnapshot();
    });
    
    test('Pruebas con las insteracciones del calendario ', () => {
        const calendar = wrapper.find('Calendar');
        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});
        calendar.prop('onSelectEvent')({});
        expect(store.dispatch).toHaveBeenCalledWith({type: types.eventSetActive, payload: {}});
        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');    
        });
    });
});
