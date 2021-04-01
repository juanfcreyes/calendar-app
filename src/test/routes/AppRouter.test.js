import { Provider } from "react-redux";
import { mount } from "enzyme/build";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { AppRouter } from "../../routes/AppRouter";
import '@testing-library/jest-dom';

const middlewares = [thunk];
const mocktore = configureStore(middlewares);

describe('Pruebas sobre AppRouter', () => {    
    test('Debe de renderizar espere ', () => {
        const initialState = {
            auth: {
                checking: true
            }
        };
        const store = mocktore(initialState);
        const wrapper = mount(<Provider store={store} >
            <AppRouter></AppRouter>
         </Provider>);
        expect(wrapper.find('h1').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta publica ', () => {
        const initialState = {
            auth: {
                checking: false
            }
        };
        const store = mocktore(initialState);
        const wrapper = mount(<Provider store={store} >
            <AppRouter></AppRouter>
         </Provider>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('LoginScreen').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta publica ', () => {
        const initialState = {
            auth: {
                checking: false,
                user: {
                    uid: 'asdfdsf'
                }
            },
            calendar: {
                events: []
            },  
            ui:{
                modalOpen: false
            }
        };
        const store = mocktore(initialState);
        const wrapper = mount(<Provider store={store}>
            <AppRouter></AppRouter>
         </Provider>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('CalendarScreen').exists()).toBe(true);
    });

});
