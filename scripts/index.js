import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {cards, classData} from "../Utils/initialData.js";

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


// Доступ к временным элементам
const templateElement = '.elements-template';
const cardsContainer = document.querySelector('.elements');

//Получаем доступ к попапу всплывающей картинки
const popupImage = document.querySelector('.popup_image');
const popupButtonCloseImage = popupImage.querySelector('.popup__close');
export const popupPhotosImage = document.querySelector('.popup__image');
export const popupImageName = document.querySelector('.popup__image-name');

//Оверлеи
const profileOverlay = popupProfileElement.querySelector('.popup__overlay');
const popupCardOverlay = popupCard.querySelector('.popup__overlay');
const popupImageOverlay = popupImage.querySelector('.popup__overlay');


const profileValidator = new FormValidator(classData, formElementProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(classData, formElementCards);
cardValidator.enableValidation();

function createCard(item) {
    const card = new Card(item, templateElement);

    return card.generateCard();
}

function renderCard() {
    cards.forEach((card) => {
        cardsContainer.append(createCard(card));
    });
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
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


});

//сохранение карточки добавления картинок
popupCard.addEventListener('submit', event => {
    event.preventDefault();
    const placeName = createCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    });
    cardsContainer.prepend(placeName);
    closePopup(popupCard);
    formElementCards.reset();
    cardValidator.toggleButtonState();

});

// окрытие попапа добавления карточек
profileCardAddOpenPopupButton.addEventListener('click', () => {
    openPopup(popupCard);


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
profileOverlay.addEventListener('click', function () {
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

