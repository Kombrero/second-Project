'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import inputSimbol from './modules/inputSimbol';
import validPhone from './modules/validPhone';

//Timer
countTimer('10 may 2020');
// Menu
toggleMenu();
//popup
togglePopup();
// Табы
tabs();
//Слайдер
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

// Калькуятор расчет
calc(100);
// send-ajax-form
const form1 = document.getElementById('form1'),
    form2 = document.getElementById('form2'),
    form3 = document.getElementById('form3');

sendForm(form1);
sendForm(form2);
sendForm(form3);
// Запрет ввода
inputSimbol();

validPhone(form1);
validPhone(form2);
validPhone(form3);