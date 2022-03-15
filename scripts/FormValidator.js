class FormValidator {

    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

     _showInputError(formElement, inputElement, errorMessage)  {

        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__input-error_visible');
    };

    _hideInputError (formElement, inputElement){

        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__input-error_visible');
        errorElement.textContent = '';
    };
    _isValid (formElement, inputElement){
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    };
    _setEventListeners (){
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonElement = formElement.querySelector(this._form.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, rest);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);

    };
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}











