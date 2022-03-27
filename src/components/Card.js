export  class Card {
    constructor(data, selector, handleCardClick) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._name = data.name;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {

        this._placeElement.querySelector('.element__button-heart').addEventListener('click', (evt) => {
            this._handleLikeButtonClick(evt);
        })

        this._placeElement.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            this._handleRemoveButtonClick(evt);
        });

        this._cardsElementImage.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _getTemplateElement() {
        return document.querySelector(this._selector).content.querySelector('.element')
            .cloneNode(true);
    }

    _handleLikeButtonClick(evt) {
        evt.target.classList.toggle('element__button-heart_liked');
    }

    _handleRemoveButtonClick(evt) {
        evt.target.closest('.element').remove();
    }


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
