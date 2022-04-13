import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._handleSubmitForm = handleSubmitForm;
        this._formInputs = this._formElement.querySelectorAll('.popup__input');
        this._formElementSubmitButton = this._formElement.querySelector('.popup__button');
    }
    changeSubmitHandler(newSubmitHandler){
        this._handleSubmitForm = newSubmitHandler;

    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues(event));
        });

    }

    _getInputValues() {
        const inputs = [...this._formInputs]
        const values = {};
        inputs.forEach(input => {
            values[input.name] = input.value;
        })
        return values;
    }
    getFormValues(){
        return this._getInputValues()
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    isLoadingMessage(isLoading) {
        if (isLoading === true) {
            this._formElementSubmitButton.textContent = 'Сохранение...';
        } else {
            this._formElementSubmitButton.textContent = 'Сохранить';
        }
    }

}