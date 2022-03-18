export default class FormValidator {
    constructor(validationConfig, form) {
        this._form = form;
        this._settings = validationConfig;
        this._buttonElement =  this._form.querySelector(this._form.submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    }

    _hasInvalidInput() {

        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    disableSubmitButton() {
        this._buttonElement.classList.add(this._settings.inActiveButtonClass);
        this._buttonElement.disabled = true;

    }

    enableSubmitButton() {
        this._buttonElement.classList.add(this._settings.inActiveButtonClass);
        this._buttonElement.disabled = false;

    }

     toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._disableSubmitButton(this._buttonElement)
        } else {
            this._enableSubmitButton(this._buttonElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    _hideInputError(formElement, inputElement) {
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(this._buttonElement);
            });
        });
    };

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();

    };

    resetErrors() {
        this._form.reset();
        this._inputList.forEach((inputElement) => {
           this._hideInputError(inputElement);
        });

        this._toggleButtonState();
    }
}

// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// }
//
//
//
//
//






