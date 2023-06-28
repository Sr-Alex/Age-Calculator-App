// Inputs elements
const inputs = document.querySelectorAll('input');

// Button element
const button = document.querySelector('#btn-calc');

// Button click event
button.onclick = () => ageCalc()
var i = 0;

// onInput events
inputs.forEach(elem => {
    elem.oninput = () => checkInput(elem);
})

// Write Results
function writeDisplay(years, months, days){
    const yearsDisplay = document.querySelector('#years-counter');
    const monthsDisplay = document.querySelector('#months-counter');
    const daysDisplay = document.querySelector('#days-counter');

    yearsDisplay.textContent = 0;
    monthsDisplay.textContent = 0;
    daysDisplay.textContent = 0;

    let animation = setInterval(() => {
        if (yearsDisplay.textContent < years){
        yearsDisplay.textContent ++;
        }
        else if (monthsDisplay.textContent < months){
        monthsDisplay.textContent ++;

        }
        else if(daysDisplay.textContent < days){
        daysDisplay.textContent ++;
        }
        else {
            clearInterval(animation)
        }
    }, years < 2000 ? 10: 150);
}

// Calculate
function ageCalc(){
    let yearinput = inputs[2].value;
    let monthInput = inputs[1].value;
    let dayInput = inputs[0].value;

    if (checkError(yearinput, monthInput, dayInput)){
        return;
    }
    
    let now = new Date();
    let birthDate = 0
    birthDate =  new Date(parseInt(yearinput), parseInt(monthInput) - 1, parseInt(dayInput));

    let miliseconds = now - birthDate;
    let yearsLived = Math.floor(miliseconds / (1000 * 60 * 60 * 24 * 365));
    let monthsLived = Math.floor(miliseconds / (1000 * 60 * 60 * 24 * 30.44));
    let daysLived = Math.floor(miliseconds / (1000 * 60 * 60 * 24));

    console.log(miliseconds)
    writeDisplay(yearsLived, (monthsLived % 12), (daysLived % 12));
}

// Check inputs digits
function checkInput(input) {
    let maxLength = 2;
    let maxValue = 31;

    switch (input.placeholder) {
        case 'MM':
            maxValue = 12;
            break;
        
        case 'YYYY':
            maxLength = 4;
            min
            maxValue = new Date().getFullYear();
            break;
    
        default:
            break;
    }

    if (input.value.length > maxLength){
        input.value = input.value.slice(0, maxLength);
    }
    else if (input.value > maxValue){
        input.value = input.value.slice(0, input.value.length - 1);
    }
}

// check inputs error
function checkError(year, month, day){
    const root = document.querySelector(':root');
    const formSpan = document.querySelector('.user-area form div span');

    if ((month == 2 && day > 28) || ([4,6,9,11].includes(parseInt(month)) && day > 30)){
        root.style.setProperty('--label-color', 'var(--Light-red)');
        formSpan.style.setProperty('display', 'block');
        formSpan.textContent = 'Must be a valid date!';
        return true;
    }
    else{
        root.style.setProperty('--label-color', 'var(--Smokey-grey)');
        formSpan.style.setProperty('display', 'none');
    }

    if (!year || !month || !day){
        root.style.setProperty('--label-color', 'var(--Light-red)');
        formSpan.style.setProperty('display', 'block');
        formSpan.textContent = 'All fields are required!';
        return true;
    }
    else{
        root.style.setProperty('--label-color', 'var(--Smokey-grey)');
        formSpan.style.setProperty('display', 'none');
        return false;
    }
}