import { fetchWithOutToken, fetchWithToken } from "../../helpers/fetch";

describe('Pruebas sobre helper fetch', () => {
    
    let token = '';
    test('Debe de funcionar el uso de fechtSinToken', async () => {
        const resp = await fetchWithOutToken('auth', {
            email : "jcastillo@test.com",
            password: "123456"
        }, 'POST');     
        expect(resp instanceof Response).toBe(true);
        const body = await resp.json();
        expect(body.ok).toBe(true);
        token = body.token;
    });

    test('Debe de funcionar el uso de fechtSinToken', async () => {
        localStorage.setItem('calendar-token', token);
        const resp = await fetchWithToken('auth');
        const body = await resp.json();
        expect(body.ok).toBe(true);
        expect(body.msg).toBe('renew');
    });

});
