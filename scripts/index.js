import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {cards, validationConfig} from "./initialData.js";

// Попап профиля
const popupProfileElement = document.querySelector('.popup_profile');

//Форма профиля
const formElementProfile = document.forms.profile;

//кнопка закрытия профиля
const popupCloseButtonProfile = popupProfileElement.querySelector('.popup__close');

//кнопка открытия профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');

//доступ к инпутам
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.job;

//инпуты с ошибкой
const nameInputError = formElementProfile.querySelector('#popup__name-input-error');
const jobInputError = formElementProfile.querySelector('#popup__job-input-error');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//Попап карточек
const popupCard = document.querySelector('.popup_place');
const formElementCards = document.forms.newPlace;
// кнопка добавления карточек
const profileCardAddOpenPopupButton = document.querySelector('.profile__add-card');
const cardClosePopupButton = popupCard.querySelector('.popup__close');
const placeNameInput = formElementCards.elements.placeName;
const placeLinkInput = formElementCards.elements.placeLink;
const buttonSubmitCads = popupCard.querySelector('.popup__button');
// Поля с ошибкой
const placeNameInputError = document.querySelector('#popup__placeName-input-error');
const placeLinkInputError = document.querySelector('#popup__placeLink-input-error');

// Доступ к временным элементам
const templateElement = '.elements-template';
const elements = document.querySelector('.elements');

//Получаем доступ к попапу всплывающей картинки
const popupImage = document.querySelector('.popup_image');
const popupButtonCloseImage = popupImage.querySelector('.popup__close');
const popupPhotosImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');

//Оверлеи
const editProfileOverlay = popupProfileElement.querySelector('.popup__overlay');
const popupCardOverlay = popupCard.querySelector('.popup__overlay');
const popupImageOverlay = popupImage.querySelector('.popup__overlay');


const editProfileValidator = new FormValidator(validationConfig, profileOpenPopupButton);
const addCardValidator = new FormValidator(validationConfig, profileCardAddOpenPopupButton);
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function createCard(item) {
    const card = new Card(item, templateElement);

    return card.generateCard();
}

function renderCard() {
    cards.forEach((card) => {
        elements.append(createCard(card));
    });
}

// function deleteCard(e) {
//     e.target.closest('.element').remove();
// }

// function likedCard(e) {
//     e.target.classList.toggle('element__button-heart_liked');
// }

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

// валидация попапа профиля
function resetEditPopupFields() {
    nameInput.classList.remove('popup__input_type_error');
    jobInput.classList.remove('popup__input_type_error');
    nameInputError.classList.remove('popup__error_visible');
    nameInputError.textContent = '';
    jobInputError.classList.remove('popup__error_visible');
    jobInputError.textContent = '';
}

// валидация попапа карточек
function resetAddPopupFields() {
    placeNameInput.classList.remove('popup__input_type_error');
    placeLinkInput.classList.remove('popup__input_type_error');
    placeNameInputError.classList.remove('popup__error_visible');
    placeNameInputError.textContent = '';
    placeLinkInputError.classList.remove('popup__error_visible');
    placeLinkInputError.textContent = '';
}

function addListeners(cardElement) {
    cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.element__button-heart').addEventListener('click', likedCard);
    cardElement.querySelector('.element__image').addEventListener('click', addPopupImage);
}

//сохранение карточки профиля
formElementProfile.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfileElement);


});

// окрытие попапа профиля
profileOpenPopupButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupProfileElement);
    resetEditPopupFields(profileOpenPopupButton);

});

//сохранение карточки добавления картинок
popupCard.addEventListener('submit', event => {
    event.preventDefault();
    const placeName = createCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    });
    elements.prepend(placeName);
    closePopup(popupCard);
    placeNameInput.value = "";
    placeLinkInput.value = "";
    buttonSubmitCads.classList.add('popup__button_disabled');
    // buttonSubmitCads.setAttribute('disabled', true);


});

// окрытие попапа добавления карточек
profileCardAddOpenPopupButton.addEventListener('click', () => {
    openPopup(popupCard);
    addCardValidator.resetErrors();
    addCardValidator.toggleButtonState();
    openPopup(popupCard);
    //resetAddPopupFields(profileCardAddOpenPopupButton);

});

// окрытие попапа всплывающих картинок
export function addPopupImage(imageLink, imageName) {
    popupPhotosImage.src = imageLink;
    popupPhotosImage.alt = imageName;
    popupImageName.textContent = imageName;
    openPopup(popupImage);

}

// закрытие попапа профиля
popupCloseButtonProfile.addEventListener('click', (event) => {
    const clickClose = event.target.closest('.popup');
    closePopup(clickClose);

});

// закрытие попапа всплывающих картинок
popupButtonCloseImage.addEventListener('click', () => {
    closePopup(popupImage);
});

// закрытие попапа добавления карточек
cardClosePopupButton.addEventListener('click', () => {
    closePopup(popupCard);

});

// закрытие попапов через Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//оверлей попапа профайла
editProfileOverlay.addEventListener('click', function () {
    closePopup(popupProfileElement);

});
//оверлей попапа добавления карточки
popupCardOverlay.addEventListener('click', function () {
    closePopup(popupCard);

});

//оверлей всплывающей картинки
popupImageOverlay.addEventListener('click', function () {
    closePopup(popupImage);

});

renderCard();

