export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }

    rendererItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item,this._containerElement)
        })
    }

    addItem(element) {
        this._containerElement.prepend(element);
    }
}