import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { startLogin, startRegister, startChecking } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

const middlewares = [thunk];
const mocktore = configureStore(middlewares);
const initialState = {};
let store = mocktore(initialState);

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

describe('Pruebas sobre las acciones de auth', () => {
    
    beforeEach(() => {
        store = mocktore(initialState);
        jest.clearAllMocks();
    });
    
    test('Start login correcto ', async () => {
        await store.dispatch(startLogin('jcastillo@test.com', '123456'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                name: expect.any(String),
                uid: expect.any(String)
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('calendar-token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('calendar-token-init-date', expect.any(Number));
    });

    test('Start login correcto ', async () => {
        await store.dispatch(startLogin('jcastillo@test.test', '123456789'));
        const actions = store.getActions();
        expect(actions.length).toBe(0);
        expect(Swal.fire).toHaveBeenCalled();
    });

    test('Start Register correcto', async () => {

        fetchModule.fetchWithOutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    user: {
                        uid: '123',
                        name: 'Juan',
                    },
                    token: 'asfdsfjd4fs23sd798d4fs'
                }
            }
        }));
        await store.dispatch(startRegister({email: 'jcast@test.test', password: '123456', name: 'Juan'}));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin, payload: {
                uid: '123',
                name: 'Juan',
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('calendar-token', 'asfdsfjd4fs23sd798d4fs'); 
    });

    test('Start checking corrceto', async () => {
        
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    user: {
                        uid: '123',
                        name: 'Juan',
                    },
                    token: 'asfdsfjd4fs23sd798d4fs'
                }
            }
        }));
        
        await store.dispatch(startChecking());
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin, payload: {
                uid: '123',
                name: 'Juan',
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('calendar-token', 'asfdsfjd4fs23sd798d4fs'); 
    });

});
