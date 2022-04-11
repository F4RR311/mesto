export  class Card {
    constructor(data, selector, handleCardClick, handleCardDeleteClick) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._likes = data.likes;
        this._name = data.name;
        this._id = data.id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardDeleteClick = handleCardDeleteClick;
    }

    _setEventListeners() {

        this._placeElement.querySelector('.element__button-heart').addEventListener('click', (evt) => {
            this._handleLikeButtonClick(evt);
        })

        this._placeElement.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleCardDeleteClick(this._id);
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

    deleteCard() {
        this._placeElement.remove();
    }
    _setLikes(){
      const likeCountElement =   this._placeElement.querySelector('.element__button-heart-count');
      likeCountElement.textContent = this._likes.length;
    }


    generateCard() {
        this._placeElement = this._getTemplateElement();
        this._cardsElementImage = this._placeElement.querySelector('.element__image');
         this._setEventListeners();

        this._cardsElementImage.src = this._imageLink;
        this._cardsElementImage.alt = this._imageName;
        this._placeElement.querySelector('.element__title').textContent = this._name;
        this._setLikes();
        return this._placeElement;
    }


}
