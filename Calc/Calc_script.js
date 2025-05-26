let currentDisplay = "";
const displayElement = document.getElementById("display");
const historyElement = document.getElementById("history");

displayElement.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\-*/.()]/g, '');
    currentDisplay = this.value;
});

displayElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        calculate();
    }
});

function appendToDisplay(value) {
    currentDisplay += value;
    displayElement.value = currentDisplay;
}

function clearDisplay() {
    currentDisplay = "";
    displayElement.value = "";
}

function addToHistory(expression, result) {
    const historyItem = document.createElement("div");
    historyItem.textContent = `${expression} = ${result}`;
    historyElement.appendChild(historyItem);
}

function calculate() {
    try {
        const result = eval(currentDisplay);
        displayElement.value = result;
        addToHistory(currentDisplay, result);
        currentDisplay = result.toString();
    } catch (error) {
        displayElement.value = "Ошибка";
    }
}