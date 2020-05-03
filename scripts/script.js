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

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
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
                }, 1000);
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

    //Калькулятор ввод

    const calcBlock = document.querySelector('.calc-block'),
        calcInput = calcBlock.querySelectorAll('input');


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

            if (calcDay && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }


            totalValue.textContent = Math.floor(total);
        };


        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
                countSum();
            }

        });

    };

    calc(100);

    // send-ajax-form

    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

    const sendForm = form => {
        const errorMessage = 'Что-то пошло не так',
            loadMessage = 'Загрузка ...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся';

        const statusMessagge = document.createElement('div');
        statusMessagge.style.cssText = 'font-size: 2rem; color: blue;';

        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessagge);

            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                statusMessagge.textContent = loadMessage;

                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    statusMessagge.textContent = successMessage;
                } else {
                    statusMessagge.textContent = errorMessage;
                }

                if (statusMessagge.textContent === successMessage) {
                    setTimeout(() => statusMessagge.remove(), 5000);
                }
            });

            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            const formData = new FormData(form);
            const body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            console.log(body);

            request.send(JSON.stringify(body));

            const input = form.querySelectorAll('input');
            input.forEach(elem => {
                elem.value = '';
            });

        });
    };

    sendForm(form1);
    sendForm(form2);
    sendForm(form3);

    // Запрет ввода

    const inputSimbol = () => {
        const inputName = document.querySelectorAll('.form-name'),
            inputFooterName = document.getElementById('form2-name'),
            inputMess = document.querySelector('.mess');

        inputName.forEach(elem => {
            elem.addEventListener('input', () => {
                console.log(elem);
                elem.value = elem.value.replace(/[^а-я ]/gi, '');
            });
            console.log(elem);
        });

        inputFooterName.addEventListener('input', () => inputFooterName.value = inputFooterName.value.replace(/[^а-я ]/gi, ''));


        inputMess.addEventListener('input', () => {
            inputMess.value = inputMess.value.replace(/[^а-я ]/gi, '');
        });

    };

    inputSimbol();

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
                if (errorDiv) {
                    inputPhone.nextElementSibling.remove('validator-error');
                }
            } else {

                inputPhone.insertAdjacentElement('afterend', errorDiv);

            }
        });

    };
    validPhone(form1);
    validPhone(form2);
    validPhone(form3);

    //Validator

    // class Validator {
    //     constructor({ selector, pattern = {}, method }) {
    //         this.selector = document.querySelectorAll(selector);
    //         this.pattern = pattern;
    //         this.method = method;
    //         console.log(this.selector);
    //         this.form = document.querySelectorAll('form');
    //         this.error = new Set();
    //     }
    //     init() {
    //         this.form.forEach(el => {
    //             el.addEventListener('submit', e => {
    //                 e.preventDefault();
    //                 this.selector.forEach(elem => this.checkIt({ target: elem }));
    //                 if (this.error.size !== 0) {
    //                     e.preventDefault();
    //                 }
    //             });
    //         });
    //         this.applyStyle();
    //         this.setPattern();
    //         this.selector.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));

    //     }

    //     isValid(elem) {
    //         const validatorMethod = {
    //             notEmpty(elem) {
    //                 if (elem.value.trim() === '') {
    //                     return  false;
    //                 }
    //                 return true;
    //             },

    //             patterns(elem, pattern) {
    //                 return pattern.test(elem.value);
    //             }
    //         };

    //         if (this.method) {
    //             const method = this.method[elem.id];
    //             if (method) {
    //                 return method.every(item => {
    //                     validatorMethod[item[0]](elem, this.pattern[item[1]]);
    //                 });
    //             }

    //         } else {
    //             console.warn('Необходимо передать ID полей ввода и методы проверки этих полей');
    //         }
    //     }


    //     checkIt(event) {

    //         const target = event.target;
    //         console.log(target);

    //         if (this.pattern.phone === /\d/) {
    //             this.showSuccess(target);
    //             this.error.delete(target);
    //             console.log(this.error);
    //         } else {
    //             this.showError(target);
    //             this.error.add(target);
    //             console.log(this.error);
    //         }

    //     }


    //     showError(elem) {
    //         elem.classList.remove('success');
    //         elem.classList.add('error');
    //         if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
    //             return;
    //         }
    //         const errorDiv = document.createElement('div');
    //         errorDiv.textContent = 'Ошибка в этом поле';
    //         errorDiv.classList.add('validator-error');
    //         elem.insertAdjacentElement('afterend', errorDiv);
    //     }

    //     showSuccess(elem) {
    //         elem.classList.remove('error');
    //         elem.classList.add('success');

    //         if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
    //             elem.nextElementSibling.remove('validator-error');
    //         }
    //     }


    //     applyStyle() {
    //         const style = document.createElement('style');
    //         style.textContent = `
    //         input.success {
    //             border: 2px solid green
    //         }
    //         input.error {
    //             border: 2px solid red
    //         }
    //         .validator-error{
    //             font-size: 12px;
    //             font-family: sans-serif;
    //             color: red
    //         }
    //         `;
    //         document.head.appendChild(style);
    //     }
    //     setPattern() {
    //         if (!this.pattern.phone) {
    //             this.pattern.phone = /\d/;
    //         }

    //         console.log(this.pattern);
    //     }
    // }

    // const valid = new Validator({
    //     selector: '.form-phone',
    //     pattern: {
    //         //phone: /[0-9+]/
    //     },
    //     method: {
    //         'phone': [
    //             ['notEmpty'],
    //             ['pattern', 'phone']

    //         ]
    //     }
    // });

    // valid.init();
});
