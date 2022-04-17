import {Popup} from "./Popup.js";


export class PopupWithImage extends Popup {
    _image = this._popup.querySelector('.popup__image');
    _nameEl = this._popup.querySelector('.popup__image-name');

    open(name, link) {
        this._image.src = link;
        this._nameEl.textContent = name;
        this._nameEl.alt = name;

        super.open();
    }

}