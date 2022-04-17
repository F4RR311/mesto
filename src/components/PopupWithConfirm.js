import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
    }

    setEventListener() {
        super.setEventListener();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(event);
        });

    }

    changeHandlerSubmitForm(newSubmitHandler) {
        this._handlerSubmitForm = newSubmitHandler;
    }
}
