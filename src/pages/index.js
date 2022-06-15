import './index.css';
import {Card} from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {classData} from "../Utils/initialData.js";
import {UserInfo} from "../components/UserInfo.js";
import {api} from "../components/Api.js";
import {PopupWithConfirm} from "../components/PopupWithConfirm";

//Форма профиля
const formElementProfile = document.forms.profile;

//кнопка открытия профиля
const profileOpenPopupButton = document.querySelector('.profile__edit-button');

//доступ к инпутам
const nameInput = formElementProfile.elements.name;
const jobInput = formElementProfile.elements.job;

//Попап карточек
const formElementCards = document.forms.newPlace;

//Попап аватара
const avatarPopup = document.forms.avatarForm;


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

const avatarValidator = new FormValidator(classData, avatarPopup);
avatarValidator.enableValidation();

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
        userId = userData._id;
        cards.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            })
            section.addItem(card)
        })
    })
    .catch(err => {
        console.log('Error', err);
    });




const createCard = (data) => {
    const card = new Card(
        data,
        templateElement,
        () => {
            imagePopup.open(data.name, data.link);
        },
        //удаляем карточку
        (id) => {
            confirmModalPopup.open();
            confirmModalPopup.setSubmitAction(() => {
                api.removeCard(id)
                    .then(res => {
                        card.deleteCard();
                        confirmModalPopup.close();
                    })
                    .catch(err => {
                        console.log('Error', err);
                    });
            });
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => {
                        console.log('Error', err);
                    });
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes);
                    })
                    .catch(err => {
                        console.log('Error', err);
                    });

            }
        }
    );

    return card.generateCard();
}

//добавление картинок
const handleCardFormSubmit = (data) => {
    addCardPopup.isLoadingMessage(true)
    api.addCard(data.placeName, data.placeLink)
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            });
            section.addItem(card);
            addCardPopup.close();
            cardValidator.toggleButtonState();
        })
        .catch(err => {
            console.log('Error', err);
        })
        .finally(() => {
            addCardPopup.isLoadingMessage(false);
        })
}

//сохранение карточки профиля
const handleProfileFormFormSubmit = (data) => {
    editProfilePopup.isLoadingMessage(true)
    const {name, job} = data;
    api.editProfile(name, job)
        .then(res => {
            userInfo.setUserInfo(name, job, res.avatar);
            editProfilePopup.close();
            profileValidator.toggleButtonState();
        })
        .catch(err => {
            console.log('Error', err);
        })
        .finally(() => {
            editProfilePopup.isLoadingMessage(false)
        })

}

//сохранение аватара профиля
const handleAvatarSubmit = (data) => {
    changeAvatarPopup.isLoadingMessage(true)
    api.addAvatar(data.avatar)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            changeAvatarPopup.close();
            avatarValidator.toggleButtonState();
        })
        .catch(err => {
            console.log('Error', err);
        })
        .finally(() => {
            changeAvatarPopup.isLoadingMessage(false);
        })
}
const section = new Section({
    items: [],
    renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
    }
}, '.elements');
const imagePopup = new PopupWithImage('.popup_image');
const addCardPopup = new PopupWithForm('.popup_place', handleCardFormSubmit)
const editProfilePopup = new PopupWithForm('.popup_profile', handleProfileFormFormSubmit);
const userInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileJobSelector: '.profile__description',
    profileAvatarSelector: '.profile__avatar'
});

const confirmModalPopup = new PopupWithConfirm('.popup_delete-confirm');
confirmModalPopup.setEventListeners();

const changeAvatarPopup = new PopupWithForm('.popup_avatar', handleAvatarSubmit)


changeAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();


//окрытие попапа редактирпования аватара
profileAvatarButton.addEventListener('click', () => {
    changeAvatarPopup.open()
})
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