const showInputError = (formElement,inputElement, errorMessage )=>{

    //находим элемент внутри функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('')




}