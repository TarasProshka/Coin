import logoCoin from '../assets/images/logo.png'
import Navigo from 'navigo'
import { loginRender } from './autorization.js'
import { accountsRender } from './accounts.js'
import { transferCheck } from './transfer funds.js'
import { renderTransferHistory } from './transfer history.js'
import { chartRender } from './chart.js'
import { renderCurrencyPage } from './currency page.js'
import { mapOfBanks } from './bank-map.js'
import { createSpinner } from './spinner.js'
import { account } from './requests'

export const renderAccountDetail = data => {
    document.body.innerHTML = ''
    const router = new Navigo('/')
    const token = localStorage.getItem('token')
    const res = data.payload
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const btns = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const btn3 = document.createElement('button')
    const btn4 = document.createElement('button')
    const main = document.createElement('main')
    const mainTop = document.createElement('div')
    const title = document.createElement('h2')
    const back = document.createElement('button')
    const backIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.83 11L11.41 7.41L10 6L4 12L10 18L11.41 16.59L7.83 13H20V11H7.83Z" fill="white"/>
    </svg>`
    const mainCenter = document.createElement('div')
    const accountNumber = document.createElement('div')
    const balanceContainer = document.createElement('div')
    const balance = document.createElement('div')
    const balanceValue = document.createElement('div')
    const mainBottom = document.createElement('div')
    const mainLeft = document.createElement('div')
    const leftTitle = document.createElement('h3')
    const sendNumContainer = document.createElement('div')
    const labelNumber = document.createElement('label')
    const autoIcon = document.createElement('div')
    autoIcon.innerHTML = `
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9519 5.5L5.9519 0.5L0.951904 5.5L10.9519 5.5Z" fill="#182233"/>
    </svg>`
    const noAutoComplete = document.createElement('div')
    const autoContainer = document.createElement('div')
    const sendNum = document.createElement('div')
    const sendNumInput = document.createElement('input')
    const sendSumContainer = document.createElement('div')
    const labelSum = document.createElement('label')
    const sendSum = document.createElement('div')
    const sendSumInput = document.createElement('input')
    const sendBtn = document.createElement('button')
    const sendBtnIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="white"/>
    </svg>`
    const mainRight = document.createElement('div')
    const rightTitle = document.createElement('h2')
    const mainUnderBottom = document.createElement('div')
    const titleHistory = document.createElement('h3')
    const history = renderTransferHistory(res, false)
    header.classList.add('header', 'accounts-header', 'account-header')
    logo.classList.add('logo')
    btn1.classList.add('accounts-btn')
    btn2.classList.add('accounts-btn')
    btn3.classList.add('accounts-btn')
    btn4.classList.add('accounts-btn')
    main.classList.add('main')
    mainTop.classList.add('main-top')
    title.classList.add('main-top-title')
    back.classList.add('main-top-btn')
    mainCenter.classList.add('main-center')
    accountNumber.classList.add('main-center-account')
    balanceContainer.classList.add('balance-container')
    balance.classList.add('balance-title')
    balanceValue.classList.add('balance-value')
    mainBottom.classList.add('main-bottom')
    mainLeft.classList.add('main-left')
    leftTitle.classList.add('main-left-title')
    sendNumContainer.classList.add('send-container')
    autoIcon.classList.add('auto-icon')
    autoContainer.classList.add('auto-container')
    noAutoComplete.classList.add('auto-item')
    labelNumber.classList.add('error-transfer-label')
    sendNum.classList.add('send-number')
    sendNumInput.classList.add('send-number-input')
    sendSumContainer.classList.add('send-container')
    labelSum.classList.add('error-transfer-label')
    sendSum.classList.add('send-sum')
    sendSumInput.classList.add('send-sum-input')
    sendBtn.classList.add('send-btn')
    mainRight.classList.add('main-right')
    rightTitle.classList.add('right-title')
    mainUnderBottom.classList.add('main-under-bottom')
    titleHistory.classList.add('history-title')
    logo.src = logoCoin
    btn1.textContent = 'Банкоматы'
    btn2.textContent = 'Счета'
    btn3.textContent = 'Валюта'
    btn4.textContent = 'Выйти'
    title.textContent = 'Просмотр счёта'
    back.innerHTML = backIcon + '\xa0\xa0' + 'Вернуться назад'
    accountNumber.textContent = '№' + ' ' + res.account
    balance.textContent = 'Баланс'
    balanceValue.textContent = res.balance + ' ' + '₽'
    leftTitle.textContent = 'Новый перевод'
    noAutoComplete.textContent = 'Нет сохраненных записей'
    sendNum.textContent = 'Номер счёта получателя'
    sendSum.textContent = 'Сумма перевода'
    sendNumInput.placeholder = 'Номер счета'
    sendSumInput.placeholder = 'Сумма'
    sendBtn.innerHTML = sendBtnIcon + '\xa0\xa0' + 'Отправить'
    rightTitle.textContent = 'Динамика баланса'
    titleHistory.textContent = 'История переводов'
    header.append(logo, btns)
    btns.append(btn1, btn2, btn3, btn4)
    main.append(mainTop, mainCenter, mainBottom, mainUnderBottom)
    mainTop.append(title, back)
    mainCenter.append(accountNumber, balanceContainer)
    balanceContainer.append(balance, balanceValue)
    mainBottom.append(mainLeft, mainRight)
    mainLeft.append(leftTitle, sendNumContainer, sendSumContainer, sendBtn)
    sendNumContainer.append(sendNum, labelNumber)
    sendSumContainer.append(sendSum, labelSum)
    labelNumber.append(sendNumInput, autoIcon, autoContainer)
    autoContainer.append(noAutoComplete)
    labelSum.append(sendSumInput)
    mainRight.append(rightTitle, chartRender(res, false))
    mainUnderBottom.append(titleHistory, history)

    btn1.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('banks-map')
        router.on('/banks-map', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            const header = await mapOfBanks().header
            document.body.append(header, (await mapOfBanks()).main)
            document.body.classList.remove('spin')
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

    btn2.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('accounts')
        router.on('/accounts', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            document.body.append((await accountsRender()).header, (await accountsRender()).main)
            document.body.classList.remove('spin')
        }).resolve()
    })

    btn3.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('available-currency')
        router.on('/available-currency', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            const header = (await renderCurrencyPage()).header
            const main = (await renderCurrencyPage()).main
            document.body.append(header, main)
            document.body.classList.remove('spin')
        }).resolve()
    })

    back.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate(`accounts`)
        router.on('/accounts', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            const header = (await accountsRender()).header
            document.body.classList.remove('spin')
            document.body.append(header, (await accountsRender()).main)
        }).resolve()
    })

    labelNumber.addEventListener('click', e => {
        autoIcon.classList.toggle('auto-icon-active')
        autoContainer.classList.toggle('auto-container-active')
        e._click = true
    })

    window.addEventListener('click', e => {
        if (e._click) return
        autoIcon.classList.remove('auto-icon-active')
        autoContainer.classList.remove('auto-container-active')
    })

    sendNumInput.addEventListener('input', () => {
        autoIcon.classList.remove('auto-icon-active')
        autoContainer.classList.remove('auto-container-active')
    })

    sendBtn.addEventListener('click', async () => {
        await transferCheck(token, res.account, sendNumInput, sendSumInput,
            labelNumber, labelSum, sendBtn, res)
        if (localStorage.getItem(res.account) !== null) {
            const autoArray = JSON.parse(localStorage.getItem(res.account))
            if (autoArray !== []) {
                noAutoComplete.remove()
                autoContainer.innerHTML = ''
                for (let i = 0; i < autoArray.length; i++) {
                    const autoItem = document.createElement('div')
                    autoItem.classList.add('auto-item')
                    autoItem.textContent = autoArray[i]
                    autoContainer.append(autoItem)
                    autoItem.addEventListener('click', () => {
                        sendNumInput.value = autoItem.textContent
                        autoIcon.classList.remove('auto-icon-active')
                        autoContainer.classList.remove('auto-container-active')
                    })
                }
            }
        }
    })

    if (localStorage.getItem(res.account) !== null) {
        const autoArray = JSON.parse(localStorage.getItem(res.account))
        noAutoComplete.remove()
        for (let i = 0; i < autoArray.length; i++) {
            const autoItem = document.createElement('div')
            autoItem.classList.add('auto-item')
            autoItem.textContent = autoArray[i]
            autoContainer.append(autoItem)
            autoItem.addEventListener('click', () => {
                sendNumInput.value = autoItem.textContent
                autoIcon.classList.remove('auto-icon-active')
                autoContainer.classList.remove('auto-container-active')
            })
        }
    }

    return {
        header,
        main
    }
}