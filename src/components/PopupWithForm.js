import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues(event));
        });

    }

    _getInputValues() {
        const inputs = [...this._formElement.querySelectorAll('.popup__input')]
        const values = {};
        inputs.forEach(input => {
            values[input.name] = input.value;
        })
        return values;
    }

    getFormValues() {
        return this._getInputValues();
    }

    getFormElement() {
        return this._formElement;
    }

    close() {
        super.close();
        this._formElement.reset();
    }


}