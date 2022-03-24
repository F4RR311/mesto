import Popup from "./Popup";
import popupPhotosImage from "../scripts/index";
import popupImageName from "../scripts/index";

export default class PopupWithImage extends Popup {
    constructor(open, popupSelector) {
        super(open);
        this._popupSelector = popupSelector;

    }

    open(imageLink, imageName) {
        popupPhotosImage.src = imageLink;
        popupPhotosImage.alt = imageName;
        popupImageName.textContent = imageName;

    }

}