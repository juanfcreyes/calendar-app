const fetchWithOutToken = (endpoint, data, method = 'GET' ) => {
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    if (method === 'GET') {
        return fetch(url);
    }
    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const fetchWithToken = (endpoint, data, method = 'GET' ) => {
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    const token = localStorage.getItem('calendar-token') || '';
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            }
        });
    }
    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(data)
    })
}

export {
    fetchWithOutToken,
    fetchWithToken
}