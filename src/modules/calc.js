'use strict';
const calc = (price = 100) => {
    const calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');


    const calcBlock = document.querySelector('.calc-block'),
        calcInput = calcBlock.querySelectorAll('input');
    calcInput.forEach(elem => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/gi, ' ');
        });

    });
    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = +calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay && calcDay.value < 5 && calcDay.value !== '')  {
            dayValue *= 2;
            
        } else if (calcDay && calcDay.value < 10 && calcDay.value !== '') {
            dayValue *= 1.5;
        } else {
            dayValue *= 1;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        console.log(total);
        totalValue.textContent = Math.floor(total);
        
    };


    calcBlock.addEventListener('change', event => {
        const target = event.target;
        if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
            countSum();
        }

    });

};

export default calc;