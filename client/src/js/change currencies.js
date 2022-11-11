import { findCurrency, renderMyCurrencies } from "./get my cyrrencies.js"
import { errorAccountTransfer, errorRender } from "./Render error.js"
import { getChangeCurrency, getMyCurrency } from "./requests.js"
import successfully from '../assets/images/success.png'
import errorpng from '../assets/images/error.svg'

export const changeCurrency = async () => {
    const token = localStorage.getItem('token')
    const currencyChange = document.createElement('div')
    const title = document.createElement('h3')
    const changeContainer = document.createElement('div')
    const changeleft = document.createElement('div')
    const changeTop = document.createElement('div')
    const changeFrom = document.createElement('div')
    const changeSelectFrom = document.createElement('div')
    const header = document.createElement('div')
    const current = document.createElement('div')
    const icon = document.createElement('div')
    const body = renderMyCurrencies(await getMyCurrency(token)).body
    const changeTo = document.createElement('div')
    const changeSelectTo = document.createElement('div')
    const header2 = document.createElement('div')
    const current2 = document.createElement('div')
    const icon2 = document.createElement('div')
    const body2 = renderMyCurrencies(await getMyCurrency(token)).body
    const changeBottom = document.createElement('div')
    const changeAmount = document.createElement('div')
    const changeAmountInput = document.createElement('input')
    const btn = document.createElement('button')
    const error = errorRender('Указана неверная сумма', 'invalid-error')
    const success = errorAccountTransfer('Перевод успешен', successfully)
    const overAmount = errorAccountTransfer('Недостаточно средств на счету', errorpng)
    currencyChange.classList.add('currency-change')
    title.classList.add('right-title')
    changeContainer.classList.add('change-container')
    changeleft.classList.add('change-left')
    btn.classList.add('change-btn')
    changeTop.classList.add('change-top')
    changeFrom.classList.add('change-from')
    changeTo.classList.add('change-to')
    changeAmount.classList.add('change-amount')
    changeAmountInput.classList.add('change-amount-input')
    changeBottom.classList.add('change-bottom')
    changeSelectFrom.classList.add('change-select')
    changeSelectTo.classList.add('change-select')
    header.classList.add('change-header')
    header2.classList.add('change-header')
    current.classList.add('change-current')
    current2.classList.add('change-current')
    icon.classList.add('change-icon')
    icon2.classList.add('change-icon')
    title.textContent = 'Обмен валюты'
    btn.textContent = 'Обменять'
    changeFrom.textContent = 'Из'
    changeTo.textContent = 'в'
    changeAmount.textContent = 'Сумма'
    changeAmountInput.placeholder = 'Сумма обмена'
    current.textContent = 'BTC'
    current2.textContent = 'ETH'
    icon.innerHTML = `
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8.5L12 13.5L17 8.5H7Z" fill="#182233"/>
    </svg>`
    icon2.innerHTML = `
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8.5L12 13.5L17 8.5H7Z" fill="#182233"/>
    </svg>`
    currencyChange.append(title, changeContainer)
    changeContainer.append(changeleft, btn)
    changeleft.append(changeTop, changeBottom)
    changeTop.append(changeFrom, changeSelectFrom, changeTo, changeSelectTo)
    changeSelectFrom.append(header, body)
    header.append(current, icon)
    changeSelectTo.append(header2, body2)
    header2.append(current2, icon2)
    changeBottom.append(changeAmount, changeAmountInput)

    header.addEventListener('click', e => {
        body.classList.toggle('change-body-active')
        icon.classList.toggle('change-icon-active')
        if (body2.classList.contains('change-body-active')) {
            body2.classList.remove('change-body-active')
            icon2.classList.remove('change-icon-active')
        }
        e._click1 = true
    })

    header2.addEventListener('click', e => {
        body2.classList.toggle('change-body-active')
        icon2.classList.toggle('change-icon-active')
            if (body.classList.contains('change-body-active')) {
                body.classList.remove('change-body-active')
                icon.classList.remove('change-icon-active')
            }
        e._click2 = true
    })

    window.addEventListener('click', e => {
        if (e._click1) {
            if (body2.classList.contains('change-body-active')) {
                body2.classList.remove('change-body-active')
                icon2.classList.remove('change-icon-active')
            }
        } else if (!e._click1 && !e._click2) {
            if (body2.classList.contains('change-body-active')) {
                body2.classList.remove('change-body-active')
                icon2.classList.remove('change-icon-active')
            }
            if (body.classList.contains('change-body-active')) {
                body.classList.remove('change-body-active')
                icon.classList.remove('change-icon-active')
            }
        }
    })

    body.querySelectorAll('.change-item').forEach(e => {
        e.addEventListener('click', () => {
            current.textContent = e.textContent
        })
    })

    body2.querySelectorAll('.change-item').forEach(e => {
        e.addEventListener('click', () => {
            current2.textContent = e.textContent
        })
    })

    btn.addEventListener('click', async () => {
        const data = await getChangeCurrency(token, current.textContent, current2.textContent, 'check')
        if (changeAmountInput.value !== '' && /^[0-9]+$/g.test(changeAmountInput.value) && changeAmountInput.value > 0  
        && data.error === 'Invalid amount' && changeAmountInput.value <= await findCurrency(current.textContent)) {
            await getChangeCurrency(token, current.textContent, current2.textContent, changeAmountInput.value)
            document.body.append(success)
            changeAmountInput.value = ''
            setTimeout(() => success.remove(), 4000)
        } else if (changeAmountInput.value > await findCurrency(current.textContent))  {
            document.body.append(overAmount)
            setTimeout(() => overAmount.remove(), 4000)
            changeAmountInput.classList.add('invalid-amount')
            changeBottom.append(error)
        }
        else {
            changeAmountInput.classList.add('invalid-amount')
            changeBottom.append(error)
        }
    })

    changeAmountInput.addEventListener('input', () => {
        if (changeAmountInput.classList.contains('invalid-amount')) {
            changeAmountInput.classList.remove('invalid-amount')
            error.remove()
        }
    })

    return currencyChange
}