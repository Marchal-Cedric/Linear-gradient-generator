const body = document.body;
const mainColors = document.querySelector(".main__colors");
const inputColors = document.querySelectorAll(".main__input");
const range = document.querySelector(".main__range");
const buttons = document.querySelectorAll(".main__btn");
const buttonRandom = document.querySelector(".main__buttonRandom");

// Start
let colorValues = ["#F27D16", "#F2F0F1"];
let angle = 45;
let index = 3;

inputColors.forEach(input => {
    input.addEventListener("input", colorChange)
})

inputColors[0].value = colorValues[0];
inputColors[1].value = colorValues[1];

inputColors[0].style.background = colorValues[0];
inputColors[1].style.background = colorValues[1];

body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;

// Angle
range.addEventListener('input', (e) => {
    console.log(colorValues)
    angle = e.target.value * 3.6;
    body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;
});

// Input change value
function colorChange(e){
    let currentIndex = e.target.getAttribute("data-index");
    e.target.value = e.target.value.toUpperCase();
    colorValues[currentIndex - 1] = e.target.value.toUpperCase();
    e.target.style.background = colorValues[currentIndex - 1];
    body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;
}

// Buttons
buttons.forEach(button => {
    button.addEventListener("click", adAndDel);
});

function adAndDel(e){
    const allInputs = document.querySelectorAll(".main__input");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    
    if(e.target.className === "main__buttonMore"){
        if(allInputs.length >= 5){
            return;
        }

        const newInput = document.createElement('input');
        newInput.setAttribute("class", "main__input");
        newInput.setAttribute("data-index", index);
        newInput.setAttribute("maxlength", 7);
        newInput.value = `#${randomColor.toUpperCase()}`;
        newInput.style.background = `#${randomColor}`;
        mainColors.appendChild(newInput);

        colorValues.push(`#${randomColor.toUpperCase()}`);

        body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;
        index++;
    }
    else if(e.target.className === "main__buttonLess"){
        if(colorValues.length < 2){
            return
        }
        else{
            colorValues.pop();
            allInputs[allInputs.length - 1].remove();
            body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;
            index--;
        }
    }

    allInputs.forEach(input => {
        input.addEventListener("input", colorChange)
    })
};

// Generate random background color
buttonRandom.addEventListener("click", () =>{
    if(colorValues.length < 2){
        return
    }

    const inputs = document.querySelectorAll(".main__input");
    for (let i = 0; i < colorValues.length; i++) {
        colorValues[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        inputs[i].value = colorValues[i].toUpperCase();
        inputs[i].style.background = colorValues[i];
        body.style.background = `linear-gradient(${angle}deg, ${colorValues})`;
    }
})