import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formElement = document.querySelector('.popup__form');
        this._inputList = document.querySelector('.popup__input');
        this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    getFormValues() {
        return this._getInputValues();
    }

    getFormElement() {
        return this._formElement;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            this._handleSubmitForm(evt);
            super.setEventListeners();
        })

    }
}