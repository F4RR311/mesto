class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    getProfile() {

        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)

    }

    getInitialCards() {
        return    fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,

        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log);
    }


}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '2178a0fc-274b-41fe-8f86-589bb9b2b9ed',
        'Content-Type': 'application/json'
    }
});