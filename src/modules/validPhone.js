'use strict';

const validPhone = form => {
    const inputPhone = form.querySelector('.form-phone');

    inputPhone.addEventListener('change', () => {
        const valInp = inputPhone.value.replace(/[^0-9+]+/gi, '');
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.style.cssText = 'color: red;';
        errorDiv.classList.add('validator-error');
        if (inputPhone.value === valInp) {
            console.log(valInp);
            if (inputPhone.nextElementSibling) {
                inputPhone.nextElementSibling.remove('validator-error');
            }
        } else {
            if (inputPhone.nextElementSibling) {
                inputPhone.nextElementSibling.remove('validator-error');
                inputPhone.insertAdjacentElement('afterend', errorDiv);
            } else {
                inputPhone.insertAdjacentElement('afterend', errorDiv);
            }

        }
    });

};
//
export default validPhone;