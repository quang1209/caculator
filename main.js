const numberButton = document.querySelectorAll('.number')
const operatorButton = document.querySelectorAll('.operation')
const clearAll = document.querySelector('.clear')
const del = document.querySelector('.delete')
const equal = document.querySelector('.equal')
const prevValue = document.getElementById('prev-value')
const currValue = document.getElementById('curr-value')

class Caculator {
    constructor(currValueText,prevValueText){
        this.currValueText = currValueText
        this.prevValueText = prevValueText
        this.clear()
    }
    clear(){
       this.curroperand = ''
       this.prevoperand = ''
       this.operation = undefined
    }
    delete(){
        this.curroperand = this.curroperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(this.curroperand.includes('.') && number === '.') return
        this.curroperand = this.curroperand.toString() + number.toString()
    }
    chooseOperator(operate){
        if(this.curroperand === '') return
        if(this.prevoperand !== '') {
            this.compute()
        }
        this.operation = operate
        this.prevoperand = this.curroperand
        this.curroperand = ''

    }
    compute(){
        let compution
        let curr = parseFloat(this.curroperand) 
        let prev = parseFloat(this.prevoperand)
        if(isNaN(curr) || isNaN(prev)) return
        switch(this.operation) {
            case '+':
                compution = curr + prev
                break;
            case '-':
                compution =  prev - curr
                break;
            case '*':
                compution = curr * prev
                break;
            case '÷':
                compution =  prev / curr
                break;
            default:
                break
        }
        this.curroperand = compution
        this.prevoperand = ''
        this.operation = undefined  
    }
    getDisplay(number){
        const stringNumber = number.toString()
        const interger = parseFloat(stringNumber.split('.')[0])
        const demical = stringNumber.split('.')[1]
        let intergerDisplay
        if(isNaN(interger)) {
             intergerDisplay =''
        }
        else{
            intergerDisplay = interger.toLocaleString('en', {maximumFractionDigits : 0})
        }
        if(demical != null){
           return `${intergerDisplay}.${demical}`
        }else{
           return intergerDisplay
        }
    }
    updateDisplay(){
       this.currValueText.innerText = this.getDisplay(this.curroperand) 
       if(this.operation != null){
        this.prevValueText.innerText = `${this.prevoperand} ${this.operation}`
       } 
       else {
        this.prevValueText.innerText = ''
       }

    }
}
 const caculator = new Caculator(currValue,prevValue)
 numberButton.forEach((button)=>{
    button.addEventListener("click",()=>{
        caculator.appendNumber(button.innerText)
        caculator.updateDisplay()
    })
 })
 operatorButton.forEach((button)=>{
    button.addEventListener("click",()=>{
        caculator.chooseOperator(button.innerText)
        caculator.updateDisplay()
    })
 })
 equal.addEventListener('click',() =>{
    caculator.compute()
    caculator.updateDisplay()
 })
 clearAll.addEventListener('click',() =>{
    caculator.clear()
    caculator.updateDisplay()
 })
 del.addEventListener('click',() =>{
    caculator.delete()
    caculator.updateDisplay()
 })

