import { renderPages } from "./page render"
import { getMyCurrency } from "./requests.js"

export const renderMyCurrencies = data => {
    const res = data.payload
    const myCurrency = document.createElement('div')
    const myCyrrencyTitle = document.createElement('h3')
    const currencyContainer = document.createElement('div')
    const currentData = Object.entries(res)
    const pages = Math.ceil(Object.keys(res).length / 5)
    const pagesContainer = renderPages(pages).container
    pagesContainer.classList.add('new-page')
    pagesContainer.querySelectorAll('.page').forEach((e, ind, arr) => {
        arr[0].classList.add('show')
        e.addEventListener('click', () => {
            pagesContainer.querySelectorAll('.page').forEach(el => {
                if (el.classList.contains('show')) {
                    el.classList.remove('show')
                }
            })
            e.classList.add('show')
            const current = Number(e.textContent)
            currencyContainer.innerHTML = ''
            for (let i = (current * 5 - 5); i <= (current * 5 - 1); i++) {
                const currency = document.createElement('div')
                const currencyCode = document.createElement('span')
                const currencyAmount = document.createElement('span')
                const border = document.createElement('div')
                currency.classList.add('currency-container')
                currencyCode.classList.add('currency-code')
                currencyAmount.classList.add('currency-amount')
                border.classList.add('border')
                currencyCode.textContent = currentData[i][0]
                currencyAmount.textContent = String(currentData[i][1].amount).split('.')[1] === undefined
                    || String(currentData[i][1].amount).split('.')[1].length <= 2 ? currentData[i][1].amount
                    : String(currentData[i][1].amount).split('.')[0] + '.' +
                    String(currentData[i][1].amount).split('.')[1].slice(0, 2)
                currencyContainer.append(currency)
                currency.append(currencyCode, border, currencyAmount)
            }
        })
    })
    for (let i = 0; i < 5; i++) {
        const currency = document.createElement('div')
        const currencyCode = document.createElement('span')
        const currencyAmount = document.createElement('span')
        const border = document.createElement('div')
        currency.classList.add('currency-container')
        currencyCode.classList.add('currency-code')
        currencyAmount.classList.add('currency-amount')
        border.classList.add('border')
        currencyCode.textContent = currentData[i][0]
        currencyAmount.textContent = String(currentData[i][1].amount).split('.')[1] === undefined
            || String(currentData[i][1].amount).split('.')[1].length <= 2 ? currentData[i][1].amount
            : String(currentData[i][1].amount).split('.')[0] + '.' +
            String(currentData[i][1].amount).split('.')[1].slice(0, 2)
        currencyContainer.append(currency)
        currency.append(currencyCode, border, currencyAmount)
    }
    const body = document.createElement('div')
    body.classList.add('change-body')
    for (let i = 0; i < Object.keys(res).length; i++) {
        const item = document.createElement('div')
        item.classList.add('change-item')
        item.textContent = currentData[i][0]
        body.append(item)
    }
    myCurrency.classList.add('my-currency')
    myCyrrencyTitle.classList.add('right-title', 'custom')
    myCyrrencyTitle.textContent = 'Ваши валюты'
    myCurrency.append(myCyrrencyTitle, currencyContainer, pagesContainer)
    return {
        myCurrency,
        body
    }
}

export const findCurrency = async (value) => {
    const current = []
    const token = localStorage.getItem('token')
    const res = (await getMyCurrency(token)).payload
    for (let i = 0; i < Object.keys(res).length; i++) {
        if (Object.values(Object.values(res)[i])[1] === value) {
            current.push(Object.values(Object.values(res)[i])[0])
        }
    }
    return current[0]
}