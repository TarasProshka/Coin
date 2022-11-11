import Navigo from "navigo"
import { renderAccountDetail } from "./account details.js"
import { dateFormater, timeFormater } from "./dateFormat.js"
import { getAccount } from "./requests.js"
import { createSpinner } from "./spinner.js"

export const cardRender = data => {
    const router = new Navigo('/')
    const token = localStorage.getItem('token')
    const card = document.createElement('div')
    const accountNumber = document.createElement('div')
    const amount = document.createElement('div')
    const cardContainer = document.createElement('div')
    const transactionContainer = document.createElement('div')
    const transaction = document.createElement('div')
    const dateTransaction = document.createElement('div')
    const accountBtn = document.createElement('button')
    card.classList.add('card')
    accountNumber.classList.add('account-number')
    amount.classList.add('amount')
    cardContainer.classList.add('card-container')
    transactionContainer.classList.add('transaction-container')
    transaction.classList.add('transaction')
    dateTransaction.classList.add('date-transaction')
    accountBtn.classList.add('transaction-btn')
    accountNumber.textContent = data.account
    amount.textContent = data.balance + '₽'
    transaction.textContent = 'Последняя транзакция:'
    if (data.transactions.length !== 0) {
        const currentDate = data.transactions[0].date
        dateTransaction.textContent = dateFormater(currentDate) + '\xa0\xa0' + timeFormater(currentDate)
    } else {
        dateTransaction.textContent = 'Неизвестно'
    }
    accountBtn.textContent = 'Открыть'
    card.append(accountNumber, amount, cardContainer)
    cardContainer.append(transactionContainer, accountBtn)
    transactionContainer.append(transaction, dateTransaction)

    accountBtn.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate(`account/${data.account}`)
        router.on('/account/:id', async ({ data }) => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            const token = localStorage.getItem('token')
            const accountDetail = await getAccount(data.id, token)
            document.body.append(renderAccountDetail(accountDetail).header,
                renderAccountDetail(accountDetail).main)
            document.body.classList.remove('spin')
        }).resolve()
    })
    return card
}