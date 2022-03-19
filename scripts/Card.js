import {addPopupImage} from './index.js'

export default class Card {
    constructor(data, cardTemplate) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._name = data.name;
        this._cardTemplate = cardTemplate;
    }

    _setEventListeners() {
        this._placeElement.querySelector('.element__button-heart').addEventListener('click',
            (evt) => {
                this._likedCard(evt)
            })
        this._placeElement.querySelector('.element__delete-button').addEventListener('click',
            (evt) => {
                this._deleteCard(evt)
            })
        this._cardsElementImage.addEventListener('click',
            () => {
                addPopupImage(this._cardsElementImage.src, this._cardsElementImage.alt)
            })
    }

    _getTemplateElement() {
        return document.querySelector(this._cardTemplate).content.querySelector('.element')
            .cloneNode(true);
    }

    _likedCard = (evt) => {
        evt.target.classList.toggle('element__button-heart_liked');
    };

    _deleteCard = (evt) => {
        evt.target.closest('.element').remove();
    };

    generateCard() {
        this._placeElement = this._getTemplateElement();
        this._cardsElementImage = this._placeElement.querySelector('.element__image');
        this._setEventListeners();

        this._cardsElementImage.src = this._imageLink;
        this._cardsElementImage.alt = this._imageName;
        this._placeElement.querySelector('.element__title').textContent = this._name;

        return this._placeElement;
    }


}
