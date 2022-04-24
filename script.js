
const allButtons = document.querySelectorAll('button')
const numBtns = document.querySelectorAll('.num')
const oprBtns = document.querySelectorAll('.operation')

const equals = document.getElementById('equals')
const clearBtn = document.getElementById('clear')
const backspace = document.getElementById('backspace')
const decimal = document.getElementById('decimal')

const currDisplay = document.querySelector('.current')
const prevDisplay = document.querySelector('.previous')


var decimalPlaced = false;
var zeroDivision = false;
var currOperand;
var prevOperand;
var operator;


numBtns.forEach(btn => btn.onclick =()=> append(btn.innerText)) //append every num to curentDisplay
decimal.onclick =()=> {if(!decimalPlaced) {decimalPlaced = true; append(decimal.innerText)}}//only one decimal allowed
oprBtns.forEach(btn => btn.onclick =()=> setOperator(btn))
equals.onclick = () => equal()


backspace.onclick= () => currDisplay.innerText = currDisplay.innerText.slice(0,-1);
clearBtn.onclick =() => clear();

function setOperator(button) {
    
    if(operator){
        if(zeroDivision){ 
            dividedByZero();
            return
        }
        currOperand = +currDisplay.innerText
        prevOperand = calculate(prevOperand, currOperand, operator); 
    }
    else if(currDisplay.innerText != ''){
        prevOperand =  +currDisplay.innerText;
    }
    
     operator = (button.id == 'exponent') ? '^' : button.innerText;
     prevDisplay.innerText = prevOperand + operator;
     currDisplay.innerText = '';
     decimalPlaced = false;

}


function equal() {
    currOperand = +currDisplay.innerText
    let answer = calculate(prevOperand, currOperand, operator)
    if(zeroDivision){ 
        dividedByZero();
        return
    }
    prevDisplay.innerText = `${prevOperand} ${operator} ${currOperand} = ${answer}`;
    prevOperand = answer;
    currDisplay.innerText = '';
    operator = undefined;      
}

function append(value){
    currDisplay.innerText += value; 
}

function clear(){
    allButtons.forEach(btn => btn.disabled = false);
    zeroDivision = false;
    decimalPlaced = false;
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
         if (b === 0){
             zeroDivision = true;
            return 
            }
        return a/b;
        }
}

function unary(a, opr){
    if(opr = 'root') return Math.sqrt(a)
}

function dividedByZero() {
    allButtons.forEach(btn => btn.disabled = true);
    clearBtn.disabled = false;
    prevDisplay.innerText = `ERROR: Dividing by zero (${prevOperand} ${operator} ${currOperand})`;
    currDisplay.innerText ='';
    return
}

