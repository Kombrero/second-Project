'use strict';
const togglePopup = () => {
    const popUp = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

    const popupOp = () => {
        if (screen.width > 768) {
            let count = 0;
            const opInterval = setInterval(() => {
                popUp.style.display = 'block';
                popUp.style.opacity = count;
                count += 0.01;

                if (count >= 1) {
                    clearInterval(opInterval);
                }
            }, 5);

        } else {
            popUp.style.display = 'block';
        }

    };

    popupBtn.forEach(elem => {
        elem.addEventListener('click', popupOp);
    });

    popUp.addEventListener('click', event => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popUp.style.display = 'none';
        } else {
            target = target.closest('.popup-content');

            if (!target) {
                popUp.style.display = 'none';
            }
        }
    });
};

export default togglePopup;