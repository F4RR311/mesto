import './index.css';
import {Card} from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {classData} from "../Utils/initialData.js";
import {UserInfo} from "../components/UserInfo.js";
import {api} from "../components/Api.js";

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

//кнопка аватара
const profileAvatarButton = document.querySelector('.profile__avatar-btn');

// Доступ к временным элементам
const templateElement = '.elements-template';

const profileValidator = new FormValidator(classData, formElementProfile);
profileValidator.enableValidation();

const cardValidator = new FormValidator(classData, formElementCards);
cardValidator.enableValidation();

let userId

api.getProfile()
    .then(res => {

        userInfo.setUserInfo(res.name, res.about);
        userId = res._id;
    });

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            });
            section.addItem(card)
            addCardPopup.close();
        })
    });

const createCard = (data) => {
    const card = new Card(
        data,
        templateElement,
        () => {
            imagePopup.open(data.name, data.link);
        },
        (id) => {
            confirmModalPopup.open();
            confirmModalPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard();
                        confirmModalPopup.close();
                    });
            });
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes);
                    })
            }
        }
    );

    return card.generateCard();
}

const section = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
    }
}, '.elements');

//сохранение карточки профиля
const handleProfileFormFormSubmit = (data) => {
    editProfilePopup.isLoadingMessage(true)
    const {name, job} = data;

    api.editProfile(name, job)
        .then(res => {
            userInfo.setUserInfo(name, job);
        })

    editProfilePopup.close();
}

//сохранение карточки добавления картинок
const handleCardFormSubmit = (data) => {
    addCardPopup.isLoadingMessage(true)
    api.addCard(data.placeName, data.placeLink)
        .then(res => {

            const placeName = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            });

            section.addItem(placeName);
            addCardPopup.isLoadingMessage(true);
            addCardPopup.close();
            cardValidator.toggleButtonState();
        })
        .finally(() => {
            addCardPopup.isLoadingMessage(false);
        })


}
// const handleAvatarSubmit = (data) => {
//     changeAvatarPopup.isLoadingMessage(true)
//
//     const formValues = changeAvatarPopup.getFormValues();
//     api.addAvatar()
//         .then(res => {
//
//             const placeName = createCard({
//                 name: res.name,
//                 link: res.link,
//                 likes: res.likes,
//                 id: res._id,
//                 userId: userId,
//                 ownerId: res.owner._id
//             });
//
//             section.addItem(placeName);
//             addCardPopup.isLoadingMessage(true);
//             addCardPopup.close();
//             cardValidator.toggleButtonState();
//         })
//         .finally(() => {
//             addCardPopup.isLoadingMessage(false);
//         })
//
//
// }

const imagePopup = new PopupWithImage('.popup_image');
const addCardPopup = new PopupWithForm('.popup_place', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.popup_profile', handleProfileFormFormSubmit);
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__description'});
const confirmModalPopup = new PopupWithForm('.popup_delete-confirm');
//const changeAvatarPopup = new PopupWithForm('.popup_avatar',handleAvatarSubmit);

//changeAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmModalPopup.setEventListeners();

//окрытие попапа редактирпования аватара
// profileAvatarButton.addEventListener('click', ()=>{
//     changeAvatarPopup.open()
// })
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