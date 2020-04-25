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
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', event => {
            const target = event.target;
            console.log(target);

            if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('ul')) {
                handlerMenu();
            }
        });

    };

    toggleMenu();

    //popup

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

    togglePopup();

    // Табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };


        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                // eslint-disable-next-line no-loop-func
                tab.forEach((item, i) => {

                    if (item === target) {
                        toggleTabContent(i);
                    }

                });

            }
        });
    };

    tabs();
});











// /* Делегирование */
//     const buttons = document.querySelectorAll('.button'),
//         content = document.querySelector('.content');

//     const ChangeText = (elem) => {
//         content.textContent = elem.textContent;
//     };

//     for(i=0; i < buttons.length; i++){
//         buttons[i].addEventListener('click', () => {
//             ChangeText(buttons[i]);
//         });
//     }

//     function addButton(){
//         const newButton = buttons[0].cloneNode();
//         let textButton = buttons.length + 1;
//         if(textButton < 10) {
//             textButton = '0${textButton}';

//             newButton.textContent = textButton;
//             wrap
//         }
//     }


