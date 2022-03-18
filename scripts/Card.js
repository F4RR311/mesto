import {popupImage, popupPhotosImage, popupImageName, openPopup} from './Utils'

export class Card {
    constructor(data, cardTemplate) {
        this._cardTemplateElement = cardTemplate;
        this._imageLink = data.link;
        this._imageName = data.name;
        this._name = data.name;
    }


    _setEventListeners() {
        this._cardTemplateElement.querySelector('.element__button-heart').addEventListener('click', (evt => {
            this._likedCard(evt)
        }))
        this._cardTemplateElement.querySelector('.popup__close').addEventListener('click', (evt => {
            this._deleteCard(evt)
        }))

    }

    _likedCard = (evt) => {
        this._likeButton.classList.toggle('element__button-heart_liked');
    };

    _deleteCard = (eev) => {
        this._placeElement.remove();
    };

    _getTemplateElement() {
        return document.querySelector(this._cardTemplate).content.querySelector('.element').cloneNode(true);
    }

    generateCard() {
        // нашли элементы
        this._placeElement = this._getTemplateElement;
        this._cardsElementImage = this._cardTemplate.querySelector('.element__image');
        this._setEventListeners();

        this._cardsElementImage.querySelector('.element__image').src = this._link;
        this._cardsElementImage.querySelector('.element__image').alt = this._name;
        this._placeElement.querySelector('.element__title').textContent = this._name;


        return this._placeElement;
    }

}
