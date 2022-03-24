export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;

    }

    open() {
        this._popupSelector.classList.add("popup_opened");

    }

    close() {
        this._popupSelector.classList.remove('popup_opened');

    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            const popupOpened = document.querySelector(this._popupSelector);
            close(popupOpened);
        }
    }
}