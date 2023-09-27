const reset = document.querySelector(".reset");
const rainbow = document.querySelector(".rainbowMode");
const etch = document.querySelector(".etchContainer");
let rainbowMode = false;

reset.addEventListener("click", function() {
    etch.textContent = "";
    let sideLength = prompt("Specify grid side length. (Max: 100)");
    drawGrid(etch, +sideLength);
});

rainbow.addEventListener("click", function() {
    etch.textContent = "";
    rainbowMode = !rainbowMode;
    let sideLength = prompt("Specify grid side length. (Max: 100)");
    drawGrid(etch, +sideLength);
});

function drawGrid(div, dimension) {
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("div");
        row.classList.add("gridColumn");

        for (let j = 0; j < dimension; j++) {
            let element = document.createElement("div");
            element.classList.add("gridElement");
            element.addEventListener("mouseover", darken);
        
            element.style.padding = `${512 / dimension / 2}px`;
            element.style.background = "white";
            element.dataset.brightness = "100";

            if (rainbowMode) {
                element.addEventListener("mouseover", randomColor, {once: true});
            }

            row.appendChild(element);
        }
        div.appendChild(row);
    }    
}

function darken() {
    let currentBrightness = this.dataset.brightness;
    if (+currentBrightness === 0){
        return;
    }else{
        newBrightness = +currentBrightness - 10
        this.style.filter = `brightness(${newBrightness}%)`;
        this.dataset.brightness = `${newBrightness}`;
    }
    
    
}

function randomColor() {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);

    this.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
}

drawGrid(etch, 64);