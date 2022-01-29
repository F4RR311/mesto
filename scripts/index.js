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
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];






cards.forEach((cardItem)=>{
    renderCards(cardItem);
})


function renderCards(cardItem) {
    const templateElement = document.querySelector('.element-template').content;
    const placeElement = templateElement.cloneNode(true);
    const elements = document.querySelector('.elements');
    placeElement.querySelector('.element__image').src = cardItem.link;
    placeElement.querySelector('.element__title').textContent = cardItem.name;

    elements.prepend(placeElement);

}



renderCards();
let profileOpenPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close');
let nameInput = document.getElementById('first-name');
let jobInput = document.getElementById('job-input');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');


let cardAddOpenPopupButton = document.querySelector('.profile__add-button');
let cardClosePopupButton = document.querySelector('.popup__close_card');
let popupCard = document.querySelector('.popup_card');


function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function openPopupCard() {
    popupCard.classList.add('popup_opened');

}


function closePopup() {
    popup.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');

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


cardAddOpenPopupButton.addEventListener('click', openPopupCard);
cardClosePopupButton.addEventListener('click', closePopup);


profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

