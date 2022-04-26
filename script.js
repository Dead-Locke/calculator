
const allButtons = document.querySelectorAll('button')
const numBtns = document.querySelectorAll('.num')
const oprBtns = document.querySelectorAll('.operation')

const equals = document.getElementById('equals')
const clearBtn = document.getElementById('clear')
const backspace = document.getElementById('backspace')
const decimal = document.getElementById('decimal')
const negateBtn = document.getElementById('negate')

const currDisplay = document.querySelector('.current')
const prevDisplay = document.querySelector('.previous')

var currOperand;
var prevOperand;
var operator;

document.addEventListener("keydown", keyDownEvent); //keyboard support
numBtns.forEach(btn => btn.onclick =()=> append(btn.innerText)) //append every num to curentDisplay
decimal.onclick =()=> append(decimal.innerText) // append decimal, but only one decimal max
oprBtns.forEach(btn => btn.onclick =()=> setOperator(btn.innerText))
negateBtn.onclick = () => negate()
equals.onclick = () => equal()
backspace.onclick= () => currDisplay.innerText = currDisplay.innerText.slice(0,-1);
clearBtn.onclick =() => clear();

function setOperator(opr) {
    //while we can simply check if the screen is empty, it would prevent user changing operation before putting in second number.
    if(currDisplay.innerText != ''){ //if screen has user input
        if(operator != undefined) { //if operator exists
            currOperand = +currDisplay.innerText; //current operand set to user input
            let answer = calculate(prevOperand, currOperand, operator)// calculate answer
            if(answer == 'zeroDivision') {dividedByZero() ; return;}//check for division by zero
            prevOperand = +answer.toFixed(3) //store answer as prevOperand
        }
        else {
            prevOperand =  +currDisplay.innerText //if no operation, but screen is not empty, store screen
        }
    }
    if(prevOperand == undefined) return; // return if no prevOperand. Prevents bug of user clicking any operation and getting undefined 
    operator = (opr == 'xʸ') ? '^' : opr;
    prevDisplay.textContent = prevOperand + operator;
    currDisplay.textContent = '';
}

function equal() {
    if(currDisplay.innerText == '' || operator == undefined ) return; //equal sign does nothing with no operator / empty screen
    currOperand = +currDisplay.innerText //current operand set to what user wrote in display
    let answer = calculate(prevOperand, currOperand, operator) // calculate answer
    if(answer == 'zeroDivision') {dividedByZero() ; return;} //check for division by zero

    prevDisplay.innerText = `${prevOperand} ${operator} ${currOperand} =`; //display equation calculated
    prevOperand = +answer.toFixed(3); //store answer as prevOperand
    currDisplay.textContent = +answer.toFixed(3); //display answer to 3 decimal places
    operator = undefined; // reset operator
}

function append(value){
    if(currDisplay.textContent.length < 18) //limit to prevent screen overflow
        if(currDisplay.innerText.includes('.') && value == '.') return; //only one decimal allowed
        currDisplay.textContent += value; 
}

function clear(){
    allButtons.forEach(btn => btn.disabled = false);
    prevDisplay.innerText =''
    currDisplay.innerText =''
    prevOperand = undefined
    currOperand = undefined
    operator = undefined; 
}

function calculate(a, b, opr){
    if(opr == '+') return a+b;
    if(opr == '-') return a-b;
    if(opr == '×' || opr == '*') return a*b;
    if(opr == '^') return a**b;
    if(opr == '÷' || opr == '/'){
        if (b === 0)return 'zeroDivision';
        return a/b;
        }
}

function negate(){ //toggle a negative sign on the user input
    if(currDisplay.textContent == '') return
    if(currDisplay.textContent.includes('-')) currDisplay.textContent = currDisplay.textContent.slice(1);
    else {currDisplay.textContent = '-' + currDisplay.textContent;}
}

function dividedByZero() { //disable all buttons, snarky message, only clear button allowed
        allButtons.forEach(btn => btn.disabled = true);
        clearBtn.disabled = false;
        prevDisplay.innerText = `Divided by zero? Really?`;
        currDisplay.innerText =`${prevOperand} ${operator} ${currOperand}`;
}

function keyDownEvent(e) { // keyboard support functions 
    var key = e.key
    if((key >= 0 && key <= 9) || (key == '.')) append(key);
    if(key == '+' || key == '-' || key == '*' || key == '/' || key == '^') setOperator(key);
    if(key == 'n' || key == 'N' ) negate();
    if(key == 'Enter' || key == '=') equal();
    if(key == 'Backspace') currDisplay.innerText = currDisplay.innerText.slice(0,-1);
    if(key == 'Escape' || key == 'c' || key == 'C' ) clear();
}
