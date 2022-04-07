class Api {
    constructor({baseUrl, headers}) {
        // тело конструктора
    }

    getInitialCards() {
        // ...
    }

    // другие методы работы с API
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: '2178a0fc-274b-41fe-8f86-589bb9b2b9ed',
        'Content-Type': 'application/json'
    }
});