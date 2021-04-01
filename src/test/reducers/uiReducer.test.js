import { closeModal, openModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

describe('Pruebas sobre uiReducer', () => {
    const initialState = {
        modalOpen: false
    }

    test('Debe de retornar el estado por defecto', () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    }); 

    test('Debe de abri y cerrar el modal', () => {
        expect(uiReducer({ modalOpen: false }, openModal())).toEqual({ modalOpen: true });
        expect(uiReducer({ modalOpen: true }, closeModal())).toEqual({ modalOpen: false });
    });
    
});
