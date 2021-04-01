
import { mount } from "enzyme/build";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import '@testing-library/jest-dom';
import Swal from "sweetalert2";

const middlewares = [thunk];
const mocktore = configureStore(middlewares);
const initialState = {};
const store = mocktore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));



describe('Prueba sobre LoginScreen', () => {

    const wrapper = mount(<Provider store={store}>
        <LoginScreen></LoginScreen>
    </Provider>);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el dispath de login', () => {
       wrapper.find('input[name="loginEmail"]').simulate('change', {
           target: {
               name: 'loginEmail',
               value: 'jcastillo@test.test'
           }
       });
       wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '123456'
            }
        });
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });
        expect(startLogin).toHaveBeenCalledWith('jcastillo@test.test', '123456');
    });

    test('No hay registro si los passwords son diferentes', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
             target: {
                 name: 'registerPassword1',
                 value: '123456'
             }
         });
         wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: 'abcdef'
            }
        });
        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });
        expect(Swal.fire).toHaveBeenCalled()
        expect(startRegister).not.toHaveBeenCalled();

    });

    test('Debe dispararse start register con passwords iguales', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '123456'
            }
        });
        wrapper.find('input[name="registerPassword2"]').simulate('change', {
           target: {
               name: 'registerPassword2',
               value: '123456'
           }
       });
       wrapper.find('form').at(1).prop('onSubmit')({
           preventDefault(){}
       });
       expect(startRegister).toHaveBeenCalled();
    })
    
    
    
}); 
