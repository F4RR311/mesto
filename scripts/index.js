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
const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popups = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCloseButton = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input-first-name');
const jobInput = document.querySelector('.popup__input-job');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form_profile');

//Форма попапа карточек
const cardAddOpenPopupButton = document.querySelector('.profile__add-button');
const cardClosePopupButton = document.querySelector('.popup__close_card');
const popupCard = document.querySelector('.popup_card');
const placeNameInput = document.querySelector('.popup__input-name');
const placeLinkInput = document.querySelector('.popup__input-link');
const formElementCards = document.querySelector('.popup__form_card');
// доступ к картинкам карточки


// Доступ к временным элементам
const templateElement = document.querySelector('.elements-template').content;
const elements = document.querySelector('.elements');
// Получаем доступ к кнопке лайка
const buttonElementHeart = document.querySelector('.element__button-heart')
//Получаем доступ к попапу всплывающей картинки
const popupImage = document.querySelector('.popup_image');
const popupButtonCloseImage = document.querySelector('.popup__close-image');

// function returnImage(img,title,name  ){
//     let a = document.querySelector('.element__image');
//     let  = document.querySelector('.element__title');
//     let c = document.querySelector('.element__image');
// }
function createCard(cardItem) {
    const placeElement = templateElement.cloneNode(true);
    placeElement.querySelector('.element__image').src = cardItem.link;
    placeElement.querySelector('.element__title').textContent = cardItem.name;
    placeElement.querySelector('.element__image').alt = cardItem.name;
    addListeners(placeElement);
    return placeElement;

}


function renderCard() {
    cards.forEach((cardItem) => {
        elements.prepend(createCard(cardItem));

    })
}

function renderPopupCard(cardItem) {
    const el = templateElement.cloneNode(true);
    el.querySelector('.element__image').src = cardItem.link;
    el.querySelector('.element__title').textContent = cardItem.name;
    el.querySelector('.element__image').alt = cardItem.name;
    addListeners(el);
    elements.prepend(el);

}

function addPopupImage(e) {
    const templateImage = document.querySelector('.popup__image-template').content;
    const imageElement = templateImage.cloneNode(true);
    const popupImageContainer = document.querySelector('.popup__image-container');
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


function togglePopup(popup) {

    if (popup.classList.contains("popup_opened") === false) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileDescription.textContent;
    }
    popup.classList.toggle("popup_opened");
}

function closePopup(popup) {
    if (popup.classList.contains("popup_opened") === true) {
        popup.classList.remove("popup_opened");
    }

}

function closePopupImage() {
    popupImage.classList.remove('popup_opened');

}


function addListeners(cardElement) {
    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__button-heart').addEventListener('click', likedCard);
    cardElement.querySelector('.element__image').addEventListener('click', (e) => {
        addPopupImage(e);
        togglePopup(popupImage);
    });
}

popups.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})
popupCard.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})


function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfile);
}

function editPlaceSubmitHandler(evt) {
    evt.preventDefault();
    const placeName = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };

    renderPopupCard(placeName);
    closePopup(popupCard);
    placeNameInput.value = "";
    placeLinkInput.value = "";
}

profileOpenPopupButton.addEventListener('click', () => {
    togglePopup(popupProfile);
});
cardAddOpenPopupButton.addEventListener('click', () => {
    togglePopup(popupCard);
});

popupCloseButton.addEventListener('click', () => {
    closePopup(popupProfile);
});
cardClosePopupButton.addEventListener('click', () => {
    closePopup(popupCard)
});

// popupButtonCloseImage.addEventListener('click', ()=>{
//     closePopup(popupImage);
// });

popupImage.addEventListener('click', (e) => {
    if (e.target === popupImage.querySelector('.popup__image')) {
        return true;
    } else {
        document.querySelector('.popup__image-container').innerHTML = "";
        closePopup(popupImage);
    }
});


formElement.addEventListener('submit', editFormSubmitHandler);
formElementCards.addEventListener('submit', editPlaceSubmitHandler);

renderCard();