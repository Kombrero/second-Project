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

    //Слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            // btn = document.querySelectorAll('.portfolio-btn'),
            dotUl = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0;
        let interval;
        const dot = [];

        const dotItem = () => {

            for (let i = 0; i < slide.length; i++) {
                dot[i] = document.createElement('li');
                dot[i].classList.add('dot');
                dotUl.append(dot[i]);
            }
            return dot;
        };

        dotItem();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = ((elem, index, strClass) => {
            elem[index].classList.add(strClass);
        });

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {

            clearInterval(interval);


        };

        startSlide();

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }


            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

    };

    slider();

    //Смена картинок
    let firstImg;
    const comandContainer = document.querySelector('.command'),
        comandPerson = comandContainer.querySelectorAll('img');
    comandPerson.forEach(elem => {
        elem.addEventListener('mouseover', event => {
            firstImg = event.target.src;
            event.target.src = event.target.dataset.img;
        });

        elem.addEventListener('mouseout', event => {
            event.target.src = firstImg;
        });
    });
    console.log(comandPerson);

    //Калькулятор ввод

    const calcBlock = document.querySelector('.calc-block'),
        calcInput = calcBlock.querySelectorAll('input');
    console.log(calcInput);


    calcInput.forEach(elem => {

        elem.addEventListener('input', () => {

            elem.value = elem.value.replace(/\D/gi, ' ');
            console.log(elem.value);
        });

    });

    // Калькуятор расчет

    const calc = (price = 100) => {
        const calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay && calcDay.value < 5 ){
                dayValue *= 2;
            }else if (calcDay && calcDay.value < 10){
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }


            totalValue.textContent = total;
        };


        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
                countSum();
            }

        });

    };

    calc(100);
});
