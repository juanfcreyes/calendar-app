import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        const initialState = { checking: true }
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
   });

   test('Debe de autenticar al usaurio', () => {
       const initialState = { checking: true };
       const action = {
           type: types.authLogin,
           payload: {
               uid: 'sadesdgfg',
               name: 'test'
            }
        };
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            checking: false,
            user: { uid: 'sadesdgfg', name: 'test' }
        });
   });

});
