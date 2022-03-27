import {Card} from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
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

const profileValidator = new FormValidator(classData, formElementProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(classData, formElementCards);
cardValidator.enableValidation();

function createCard(item) {
    const card = new Card(item, templateElement, () => {
        imagePopup.open(item.name, item.link);


    });

    return card.generateCard();
}

function renderCard(card, wrap) {

    wrap.append(createCard(card));

}

const section = new Section({items: cards, renderer: renderCard}, '.elements');

section.rendererItems();


//сохранение карточки профиля
formElementProfile.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    editProfilePopup.close();


});

//окрытие попапа профиля
profileOpenPopupButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    editProfilePopup.open();


});


//сохранение карточки добавления картинок
const handleCardFormSubmit = (data) => {

    const placeName = createCard({
        name: data.placeName,
        link: data.placeLink
    });
    section.addItem(placeName);
    addCardPopup.close();
    cardValidator.toggleButtonState();

}

const imagePopup = new PopupWithImage('.popup_image');
const addCardPopup = new PopupWithForm('.popup_place', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.popup_profile', () => {
    console.log('12121')
});


addCardPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();


//окрытие попапа добавления карточек
profileCardAddOpenPopupButton.addEventListener('click', () => {
    addCardPopup.open();


});
