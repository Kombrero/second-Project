'use strict';


window.addEventListener('DOMContentLoaded', () => {

    //Timer

    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
            timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
            timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;

            if (timer.timeRemaining > 0) {
                setInterval(() => {
                    const timer = getTimeRemaining();

                    timerHours.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
                    timerMinutes.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
                    timerSeconds.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
                }
                , 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();

    }
    countTimer('01 may 2020');

    // Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItem = document.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItem.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    //popup

    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');


        const popupOp = () => {
            if (screen.width > 768) {
                let count = 0;
                const opInterval = setInterval(() => {
                    popup.style.display = 'block';
                    popup.style.opacity = count;
                    count += 0.01;

                    if (count >= 1) {
                        clearInterval(opInterval);
                    }
                }, 5);

            }else{
				popup.style.display = 'block';
			}

        };


        popupBtn.forEach(elem => {
            elem.addEventListener('click', popupOp);
        });
        popupClose.addEventListener('click', () => popup.style.display = 'none');
    };

    togglePopup();
});

