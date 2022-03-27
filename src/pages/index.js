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
        //  addCardPopup.open()


    });

    return card.generateCard();
}

function renderCard(card) {

    cardsContainer.append(createCard(card));

}

const section = new Section({items: cards, renderer: renderCard}, '.elements');

section.rendererItems();


const imagePopup = new PopupWithImage('.popup_image');
const addCardPopup = new PopupWithForm('.popup_place');
const editProfilePopup = new PopupWithForm('.popup_profile');
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();


// function openPopup(popup) {
//     popup.classList.add("popup_opened");
//
// }

function closePopup(popup) {
    popup.classList.remove('popup_opened');

}

//сохранение карточки профиля
formElementProfile.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupProfileElement);


});

//окрытие попапа профиля
profileOpenPopupButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    editProfilePopup.open();


});

//сохранение карточки добавления картинок
// popupCard.addEventListener('submit', event => {
//     event.preventDefault();
//     const placeName = createCard({
//         name: placeNameInput.value,
//         link: placeLinkInput.value
//     });
//     section.addItem(placeName)
//     closePopup(popupCard);
//     formElementCards.reset();
//     cardValidator.toggleButtonState();
//
// });


//окрытие попапа добавления карточек
profileCardAddOpenPopupButton.addEventListener('click', () => {
    addCardPopup.open();


});

// закрытие попапа профиля
// popupCloseButtonProfile.addEventListener('click', (event) => {
//     const clickClose = event.target.closest('.popup');
//     closePopup(clickClose);
//
// });

// закрытие попапа всплывающих картинок
// popupButtonCloseImage.addEventListener('click', () => {
//     closePopup(popupImage);
// });
//
// // закрытие попапа добавления карточек
// cardClosePopupButton.addEventListener('click', () => {
//     closePopup(popupCard);
//
// });


//оверлей попапа профайла
// profileOverlay.addEventListener('click', function () {
//     closePopup(popupProfileElement);
//
// });
// //оверлей попапа добавления карточки
// popupCardOverlay.addEventListener('click', function () {
//     closePopup(popupCard);
//
// });

//оверлей всплывающей картинки
// popupImageOverlay.addEventListener('click', function () {
//     closePopup(popupImage);
//
// });

// renderCard();
//
