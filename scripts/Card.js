export class Card {
    constructor(data, cardTemplateSelector) {
        this._templateElement = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
    }



    likedCard = (e) => {
        e.target.classList.toggle('element__button-heart_liked');
    }
    createCard() {
        const placeElement = this._templateElement.cloneNode(true);
        placeElement.querySelector('.element__image').src = this._link;
        placeElement.querySelector('.element__image').alt = this._name;
        placeElement.querySelector('.element__title').textContent = this._name;
        addListeners(placeElement);
        return placeElement;
    }

}


const card = new Card()