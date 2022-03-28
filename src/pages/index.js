import './index.css';
import {Card} from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {cards, classData} from "../Utils/initialData.js";
import {UserInfo} from "../components/UserInfo.js";

//Форма профиля
const formElementProfile = document.forms.profile;

//кнопка открытия профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');

//доступ к инпутам
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.job;

//Попап карточек
const formElementCards = document.forms.newPlace;

// кнопка добавления карточек
const profileCardAddOpenPopupButton = document.querySelector('.profile__add-card');

// Доступ к временным элементам
const templateElement = '.elements-template';

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

//сохранение карточки профиля
const handleProfileFormFormSubmit = (data) => {
    console.log()
    const {name, job} = data;
    userInfo.setUserInfo(name, job);
    editProfilePopup.close();
}

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
const editProfilePopup = new PopupWithForm('.popup_profile', handleProfileFormFormSubmit);
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__description'});


addCardPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();

//окрытие попапа добавления карточек
profileCardAddOpenPopupButton.addEventListener('click', () => {
    addCardPopup.open();
});

//окрытие попапа профиля
profileOpenPopupButton.addEventListener('click', () => {
    const {name, job} = userInfo.getUserInfo()
    nameInput.value = name;
    jobInput.value = job;
    editProfilePopup.open();
});

section.rendererItems();