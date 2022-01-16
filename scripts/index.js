const profileOpenPopupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

function openPopup(){
    popup.classList.add('popup__opened')
}
function closePopup(){
    popup.classList.remove('popup__opened')
}


profileOpenPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', function (e){
    if(e.target === e.currentTarget){
        closePopup();
    }
})
// Находим форму в DOM
let formElement =  document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
    let popupInput =  document.querySelector('.popup__input');// Воспользуйтесь инструментом .querySelector()


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
    function formSubmitHandler (evt) {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value

        // Выберите элементы, куда должны быть вставлены значения полей

        // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);