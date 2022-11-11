import logoCoin from '../assets/images/logo.png'
import Navigo from 'navigo'
import { loginRender } from './autorization.js'
import { account, createAccount } from './requests.js'
import { cardRender } from './cardRender.js'
import { sortAccountsBy } from './sort accounts.js'
import { renderCurrencyPage } from './currency page.js'
import { mapOfBanks } from './bank-map.js'
import { createSpinner } from './spinner.js'

export const accountsRender = async () => {
    document.body.innerHTML = ''
    const router = new Navigo('/')
    const token = localStorage.getItem('token')
    let accountsArray = await (await account(token)).payload
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const btns = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const btn3 = document.createElement('button')
    const btn4 = document.createElement('button')
    const main = document.createElement('main')
    const mainHeader = document.createElement('div')
    const titleContainer = document.createElement('div')
    const title = document.createElement('h2')
    const select = document.createElement('div')
    const selectHeader = document.createElement('div')
    const selectCurrent = document.createElement('div')
    const selectIcon = document.createElement('div')
    const selectBody = document.createElement('div')
    const selectItem0 = document.createElement('div')
    const selectItem1 = document.createElement('div')
    const selectItem2 = document.createElement('div')
    const selectItem3 = document.createElement('div')
    const addAccount = document.createElement('button')
    const selectArray = [selectItem1, selectItem2, selectItem3]
    const cardContainer = document.createElement('div')
    header.classList.add('header', 'accounts-header')
    logo.classList.add('logo')
    btn1.classList.add('accounts-btn')
    btn2.classList.add('accounts-btn', 'accounts-btn-selected')
    btn3.classList.add('accounts-btn')
    btn4.classList.add('accounts-btn')
    main.classList.add('main')
    mainHeader.classList.add('main-header')
    titleContainer.classList.add('title-container')
    title.classList.add('accounts-title')
    select.classList.add('select')
    selectHeader.classList.add('select-header')
    selectCurrent.classList.add('select-current')
    selectIcon.classList.add('select-icon')
    selectBody.classList.add('select-body')
    selectItem0.classList.add('select-item')
    selectItem1.classList.add('select-item')
    selectItem2.classList.add('select-item')
    selectItem3.classList.add('select-item')
    addAccount.classList.add('add-account')
    cardContainer.classList.add('all-cards-container')
    selectItem1.id = 'account'
    selectItem2.id = 'balance'
    selectItem3.id = 'transactions'
    logo.src = logoCoin
    btn1.textContent = 'Банкоматы'
    btn2.textContent = 'Счета'
    btn3.textContent = 'Валюта'
    btn4.textContent = 'Выйти'
    title.textContent = 'Ваши счета'
    selectIcon.innerHTML = `
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9519 5.5L5.9519 0.5L0.951904 5.5L10.9519 5.5Z" fill="#182233"/>
    </svg>`
    selectItem0.textContent = 'Сортировка'
    selectItem1.textContent = 'По номеру'
    selectItem2.textContent = 'По балансу'
    selectItem3.textContent = 'По последней транзакции'
    addAccount.textContent = '+ Создать новый счёт'
    selectCurrent.textContent = selectItem0.textContent
    btns.append(btn1, btn2, btn3, btn4)
    header.append(logo, btns)
    main.append(mainHeader, cardContainer)
    mainHeader.append(titleContainer, addAccount)
    titleContainer.append(title, select)
    select.append(selectHeader, selectBody)
    selectHeader.append(selectCurrent, selectIcon)
    selectBody.append(selectItem1, selectItem2, selectItem3)

    btn1.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('banks-map')
        router.on('/banks-map', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            setTimeout(async () => {
                document.body.append((await mapOfBanks()).header, (await mapOfBanks()).main)
                document.body.classList.remove('spin')
            }, 1000)
        }).resolve()
    })

    btn4.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('/')
        router.on('/', () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            setTimeout(() => {
                document.body.append(loginRender().header, loginRender().form)
                document.body.classList.remove('spin')
            }, 1000)
        }).resolve()
    })

    btn3.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('available-currency')
        router.on('/available-currency', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            setTimeout(async () => {
                const header = (await renderCurrencyPage()).header
                const main = (await renderCurrencyPage()).main
                document.body.append(header, main)
                document.body.classList.remove('spin')
            }, 1000)
        }).resolve()
    })

    selectHeader.addEventListener('click', e => {
        selectBody.classList.toggle('select-body-active')
        selectIcon.classList.toggle('select-icon-active')
        e._click = true
    })

    for (const type of selectArray) {
        type.addEventListener('click', () => {
            selectCurrent.textContent = type.textContent
            selectBody.classList.remove('select-body-active')
            selectIcon.classList.remove('select-icon-active')
        })
    }

    window.addEventListener('click', el => {
        if (el._click) return
        else {
            selectBody.classList.remove('select-body-active')
            selectIcon.classList.remove('select-icon-active')
        }
    })

    selectArray.forEach(e => {
        e.addEventListener('click', async () => {
            cardContainer.innerHTML = ''
            accountsArray = await (await account(token)).payload
            if (e.textContent === 'По последней транзакции') {
                sortAccountsBy(accountsArray, e).empty.forEach(item => cardContainer.append(cardRender(item)))
                sortAccountsBy(accountsArray, e).sortered.forEach(item => cardContainer.append(cardRender(item)))
            } else {
                sortAccountsBy(accountsArray, e).forEach(item => cardContainer.append(cardRender(item)))
            }
        })
    })

    addAccount.addEventListener('click', async () => {
        createAccount(token)
        accountsArray = await (await account(token)).payload
        cardContainer.append(cardRender(accountsArray[accountsArray.length - 1]))
    })

    accountsArray.forEach(item => cardContainer.append(cardRender(item)))

    return {
        header,
        main
    }
}