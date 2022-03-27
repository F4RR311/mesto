import {Popup} from "./Popup.js";


export class PopupWithImage extends Popup {
    open(name, link) {
        const image = this._popup.querySelector('.popup__image');
        const nameEl = this._popup.querySelector('.popup__image-name');


        image.src = link;
        nameEl.textContent = name;

        super.open();
    }




}