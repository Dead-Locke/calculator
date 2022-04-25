
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

var zeroDivision = false;
var currOperand;
var prevOperand;
var operator;

numBtns.forEach(btn => btn.onclick =()=> append(btn.innerText)) //append every num to curentDisplay
decimal.onclick =()=> {if(!decimalPlaced()) { append(decimal.innerText)}}//only one decimal allowed
oprBtns.forEach(btn => btn.onclick =()=> setOperator(btn))
negateBtn.onclick = () => negate()
equals.onclick = () => equal()
backspace.onclick= () => currDisplay.innerText = currDisplay.innerText.slice(0,-1);
clearBtn.onclick =() => clear();

function setOperator(button) {
    if(operator != undefined && currDisplay.innerText != ''){
        if(zeroDivision){ dividedByZero(); return}
        currOperand = +currDisplay.innerText
        let answer = calculate(prevOperand, currOperand, operator).toFixed(4)
        prevOperand = +answer 
    }
    else if(currDisplay.innerText != ''){ prevOperand =  +currDisplay.innerText;} 

    operator = (button.id == 'exponent') ? '^' : button.innerText;
    prevDisplay.innerText = prevOperand + operator;
    currDisplay.innerText = '';
}

function equal() {
    if(currDisplay.innerText == '' || operator == undefined ) return;
    currOperand = +currDisplay.innerText
    let answer = calculate(prevOperand, currOperand, operator).toFixed(4)
    if(zeroDivision){ dividedByZero(); return}
    prevDisplay.innerText = `${prevOperand} ${operator} ${currOperand} =`;
    prevOperand = +answer;
    currDisplay.innerText = +answer;
    operator = undefined;      
}

function append(value){
    currDisplay.innerText += value; 
}

function clear(){
    allButtons.forEach(btn => btn.disabled = false);
    zeroDivision = false;
    prevDisplay.innerText =''
    currDisplay.innerText ='';
    operator = undefined; 
}

function calculate(a, b, opr){
    zeroDivision = false;
    if(opr == '+') return a+b;
    if(opr == '-') return a-b;
    if(opr == '×') return a*b;
    if(opr == '^') return a**b;
    if(opr == '÷'){
        if (b === 0){zeroDivision = true; return }
        return a/b;
        }
}

function negate(){
    if(currDisplay.textContent == '') return
    if(currDisplay.textContent.includes('-')) currDisplay.textContent = currDisplay.textContent.slice(1);
    else {currDisplay.textContent = '-' + currDisplay.textContent;}
}

function dividedByZero() {
    allButtons.forEach(btn => btn.disabled = true);
    clearBtn.disabled = false;
    prevDisplay.innerText = `Divided by zero? Really?`;
    currDisplay.innerText =`${prevOperand} ${operator} ${currOperand}`;
    return
}

function decimalPlaced(){
   let num = currDisplay.innerText
   if(num.includes('.')) return true; 
   return false;
}

