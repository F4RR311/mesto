import {addPopupImage} from './index.js'

export default class Card {
    constructor(data, selector) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._name = data.name;
        this._selector = selector;
    }

    _setEventListeners() {
        this._likeButton = this._placeElement.querySelector('.element__button-heart');

        this._likeButton.addEventListener('click',
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
        return document.querySelector(this._selector).content.querySelector('.element')
            .cloneNode(true);
    }

    _likedCard = () => {
        this._likeButton.classList.toggle('element__button-heart_liked');
    };

    _deleteCard = () => {
        this._placeElement.remove();
        this._placeElement = null;
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
