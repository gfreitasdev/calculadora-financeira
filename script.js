const moneyPlus = document.querySelector('#money-plus')
const moneyMinus = document.querySelector('#money-minus')
const balance = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputName = document.querySelector('#text')
const inputAmount = document.querySelector('#amount')
const UlTransactions = document.querySelector('#transactions')

const transactionsLocal = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? transactionsLocal : []
const removeTransaction = id => {
    transactions = transactions.filter(transaction =>
         transaction.id !== id)
    updateLocalStorage()     
    init()
}

const addTransactionIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const cssClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Mathabs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(cssClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator} </span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `
    UlTransactions.append(li)
}
const getExpense = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () =>{
    const transactionsAmounts = transactions.map(( {amount })=> amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts)

    const expense = getExpense(transactionsAmounts)

    balance.textContent = `R$ ${total}`
    moneyPlus.textContent = `R$ ${income}`
    moneyMinus.textContent = `R$ ${expense}`

}

const init = () => {
    UlTransactions.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateId = () => Math.round(Math.random() *1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generateId(),
         name: transactionName,
          amount: Number(transactionAmount)
    })
}

const cleanInputs = () =>{
    inputName.value = ''
    inputAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputName.value.trim()
    const transactionAmount = inputAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    if(isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
   
}

form.addEventListener('submit', handleFormSubmit)