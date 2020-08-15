var incButton = document.querySelector('.increment');
var decButton = document.querySelector('.decrement');
var counter = document.querySelector('.counter_value');

function setCounterValue(num) {
    var currentValue = Number(counter.textContent);
    if (num > 0) {
        currentValue += 1;
    }
    else {
        currentValue -= 1;
    }
    counter.textContent = currentValue;
}

function increment() {
    setCounterValue(1);
}

function decrement() {
    setCounterValue(-1);
}


incButton.addEventListener('click', increment);
decButton.addEventListener('click', decrement)