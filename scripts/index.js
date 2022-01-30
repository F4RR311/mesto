const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: "Флоренция",
        link:
            "https://cdn.pixabay.com/photo/2016/09/08/23/08/florence-1655830_960_720.jpg",
    }
];

//Форма попапа профиля
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__input-first-name');
let jobInput = document.querySelector('.popup__input-job');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');

//Форма попапа карточек
let cardAddOpenPopupButton = document.querySelector('.profile__add-button');
let cardClosePopupButton = document.querySelector('.popup__close_card');
let popupCard = document.querySelector('.popup_card');
let placeNameInput = document.querySelector('.popup__input-name');
let placeLinkInput = document.querySelector('.popup__input-link');
let formElementCards = document.querySelector('.popup__form_card');


// Доступ к временным элементам
let templateElement = document.querySelector('.element-template').content;
let elements = document.querySelector('.elements');
// Получаем доступ к кнопке лайка
let buttonElementHeart = document.querySelector('.element__button-heart')
//Получаем доступ к попапу всплывающей картинки
let popupImage = document.querySelector('.popup_image');


function renderCards(cardItem) {
    const placeElement = templateElement.cloneNode(true);
    placeElement.querySelector('.element__image').src = cardItem.link;
    placeElement.querySelector('.element__title').textContent = cardItem.name;
    placeElement.querySelector('.element__image').alt = cardItem.name;
    addListeners(placeElement);
    elements.prepend(placeElement);

}

function addPopupImage(e) {
    let templateImage = document.querySelector('.popup__image-template').content;
    let imageElement = templateImage.cloneNode(true);
    let popupImageContainer = document.querySelector('.popup__image-container');
    imageElement.querySelector('.popup__image').src = e.target.src;
    imageElement.querySelector('.popup__image').alt = e.target.alt;
    imageElement.querySelector('.popup__image-name').textContent = e.target.alt;
    popupImageContainer.append(imageElement);

}

function deleteCard(e) {
    e.target.closest('.element').remove();
}

function likedCard(e) {
    e.target.classList.toggle('element__button-heart_liked');

}

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}


function openPopupCard() {
    popupCard.classList.add('popup_opened');
}

function openPopupImage() {
    popupImage.classList.add('popup_opened');

}

function closePopupImage() {
    popupImage.classList.remove('popup_opened');

}

function closePopup() {
    popup.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');
}

function addListeners(cardElement) {
    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__button-heart').addEventListener('click', likedCard);
    cardElement.querySelector('.element__image').addEventListener('click', (e) => {
        addPopupImage(e);
        openPopupImage(popupImage);
    });
}

popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})
popupCard.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

function placeSubmitHandler(evt) {
    evt.preventDefault();
    const placeName = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    renderCards(placeName);
    closePopup(popupCard);
    placeNameInput.value = "";
    placeLinkInput.value = "";
}

profileOpenPopupButton.addEventListener('click', openPopup);
cardAddOpenPopupButton.addEventListener('click', openPopupCard);
popupCloseButton.addEventListener('click', closePopup);
cardClosePopupButton.addEventListener('click', closePopup);

popupImage.addEventListener('click', (e) => {
    if (e.target === popupImage.querySelector('.popup_image')) {
        return true;
    } else {
        document.querySelector('.popup__image-container').innerHTML = "";
        closePopupImage(popupImage);
    }
});

formElement.addEventListener('submit', formSubmitHandler);
formElementCards.addEventListener('submit', placeSubmitHandler);

cards.forEach((cardItem) => {
    renderCards(cardItem);

})
