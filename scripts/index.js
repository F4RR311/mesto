const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__button-save');

function openPopup() {
    popup.classList.add('popup__opened')
}

function closePopup() {
    popup.classList.remove('popup__opened')
}


profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', function (e) {
    if (e.target === e.currentTarget) {
        closePopup();
    }
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.getElementById('first-name');
let jobInput = document.getElementById('job-input');
let profileTitle = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', function (e) {
    if (e.defaultPrevented) {
        closePopup();
    }
})

