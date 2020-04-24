'use strict';
const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const nowHours = new Date().getHours(),
    nowMinutes = new Date().getMinutes(),
    nowSeconds = new Date().getSeconds(),
    newYearDate = new Date('31 december 2020').getTime(),
    nowWeekDay = new Date().getUTCDay(),
    now = new Date().getTime(),
    beforeNewYear = Math.floor((newYearDate - now) / 1000 / 60 / 60 / 24);
console.log(beforeNewYear);

const todayWeekDay = weekDays[nowWeekDay - 1];
let timeD;

const timeDay = () => {
    if (nowHours > 5 && nowHours < 10) {
        timeD = 'утро';
    } else if (nowHours > 10 && nowHours < 18) {
        timeD = 'день';
    } else if (nowHours > 18 && nowHours < 22) {
        timeD = 'вечер';
    } else {
        timeD = 'ночи';
    }
};
timeDay();


document.write('Добрый ' +  timeD + '<br>' +
 // eslint-disable-next-line max-len
 ' Сегодня: ' + todayWeekDay + '<br>' + ' Текущее время: ' + nowHours + ':' + nowMinutes + ':' + nowSeconds + '<br>' + 'До нового года осталось: ' + beforeNewYear + ' дней');



