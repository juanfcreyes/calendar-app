import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { mount } from "enzyme/build";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { eventStartDeleted } from "../../../actions/events";

const middlewares = [thunk];
const mocktore = configureStore(middlewares);
const initialState = {};
const store = mocktore(initialState);
store.dispatch = jest.fn();

jest.mock('../../../actions/events', () => ({
    eventStartDeleted: jest.fn()
}));

describe('Pruebas sobre DeleteEventFab', () => {
   
    const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab></DeleteEventFab>
    </Provider>);

    test('Debe de mostrase correctamente', () => {
       expect(wrapper).toMatchSnapshot();
   });

   test('Debe de lamar el evento eventStartDeleted', () => {
        wrapper.find('.btn').simulate('click');
        expect(store.dispatch).toHaveBeenCalled();
        expect(eventStartDeleted).toHaveBeenCalled();
    });
    
});
