import {Popup} from "./Popup.js";


export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupForm = this._popup.querySelector('.popup__form')

    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', e => {
            e.preventDefault()
            this._handleSubmitCallback()
        })
    }

    setSubmitAction(action) {
        this._handleSubmitCallback = action
    }

}