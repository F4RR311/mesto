import Popup from "./Popup";


export default class PopupWithImage extends Popup {
        _popupImage = this._popup.querySelector('.popup__image');
        _popupName = this._popup.querySelector('.popup__image-name');

    open(imageLink, imageName) {
    this._popupImage.src = imageLink;
    this._popupImaqge.alt = imageLink;
    this._popupName.textContent = imageName;

    }



}