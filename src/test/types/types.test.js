import { types } from "../../types/types";

describe('Pruebas sobre types', () => {

    const typesMock = {
        uiOpenModal: '[Ui] Open Modal',
        uiCloseModal: '[Ui] Close Modal',
        
        eventAddNew: '[Event] Add New',
        eventStartAddNew: '[Event] Start Add New',
        eventSetActive: '[Event] Set Active',
        eventClearActive: '[Event] Clear Active',
        eventUpdated: '[Event] Uplated',
        eventDeleted: '[Event] Deleted',
        eventLoaded: '[Event] Loaded',
        eventClean: '[Event] Clean',
    
        authCheckingFinish: '[Auth] Ckecking Login Finish',
        authStartLogin: '[Auth] Start Login',
        authLogin: '[Auth] Login',
        authStartRegister: '[Auth] Start Register',
        authTokenRenew: '[Auth] Token Renew',
        authLogout: '[Auth] Logout',
    }


    test('Types deben ser iguales', () => {
        expect(typesMock).toEqual(types);
    });
    
})
