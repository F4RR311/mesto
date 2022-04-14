export class Card {
    constructor(data, selector, handleCardClick, handleCardDeleteClick, handleLikeClick) {
        this._imageLink = data.link;
        this._imageName = data.name;
        this._likes = data.likes;
        this._name = data.name;
        this._id = data.id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardDeleteClick = handleCardDeleteClick;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._handleLikeClick = handleLikeClick;
    }

    _setEventListeners() {

        this._placeElement.querySelector('.element__button-heart').addEventListener('click', () => {
            this._handleLikeClick(this._id);
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



    deleteCard() {
        this._placeElement.remove();

    }

    isLiked() {
        return this._likes.find(user => user._id === this._userId);

    }


    setLikes(newLikes) {

        this._likes = newLikes;
        const likeCountElement = this._placeElement.querySelector('.element__button-heart-count');
        likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._addLikeElement()
        } else {
            this._deleteLikeElement()
        }
    }

    generateCard() {
        this._placeElement = this._getTemplateElement();
        this._cardsElementImage = this._placeElement.querySelector('.element__image');


        if (this._ownerId !== this._userId) {
            this._placeElement.querySelector('.element__delete-button').style.display = 'none';
        }

        this._cardsElementImage.src = this._imageLink;
        this._cardsElementImage.alt = this._imageName;
        this._placeElement.querySelector('.element__title').textContent = this._name;


        this._setEventListeners();
        this.setLikes(this._likes);

        return this._placeElement;
    }

    _addLikeElement() {
        this._placeElement.querySelector('.element__button-heart')
            .classList.add('element__button-heart_liked');

    }

    _deleteLikeElement() {

        this._placeElement.querySelector('.element__button-heart')
            .classList.remove('element__button-heart_liked');


    }


}
