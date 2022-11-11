import logoCoin from '../assets/images/logo.png'
import Navigo from 'navigo'
import { accountsRender } from './accounts.js'
import { loginRender } from './autorization.js'
import { getAccount } from './requests.js'
import { renderAccountDetail } from './account details.js'
import { chartRender } from './chart.js'
import { renderTransferHistory } from './transfer history.js'
import { inOutChart } from './in-out-chart.js'
import { renderCurrencyPage } from './currency page.js'
import { mapOfBanks } from './bank-map.js'
import { createSpinner } from './spinner.js'

export const renderTransactionsDetail = data => {
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
    const bottomTitle = document.createElement('h2')
    const mainUnderBottom = document.createElement('div')
    const titleHistory = document.createElement('h3')
    const history = renderTransferHistory(res, true)
    const mainCenterBottom = document.createElement('div')
    const mainCenterTitle = document.createElement('h2')
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
    mainBottom.classList.add('main-bottom', 'main-detail-bottom')
    bottomTitle.classList.add('right-title')
    mainUnderBottom.classList.add('main-under-bottom', 'main-detail-underbottom')
    res.transactions.length > 10 ? '' : mainUnderBottom.classList.add('no-main')
    titleHistory.classList.add('history-title')
    mainCenterBottom.classList.add('main-center-bottom')
    mainCenterTitle.classList.add('right-title')
    logo.src = logoCoin
    btn1.textContent = 'Банкоматы'
    btn2.textContent = 'Счета'
    btn3.textContent = 'Валюта'
    btn4.textContent = 'Выйти'
    title.textContent = 'История баланса'
    back.innerHTML = backIcon + '\xa0\xa0' + 'Вернуться назад'
    accountNumber.textContent = '№' + ' ' + res.account
    balance.textContent = 'Баланс'
    balanceValue.textContent = res.balance + ' ' + '₽'
    bottomTitle.textContent = 'Динамика баланса'
    titleHistory.textContent = 'История переводов'
    mainCenterTitle.textContent = 'Соотношение входящих исходящих транзакций'
    header.append(logo, btns)
    btns.append(btn1, btn2, btn3, btn4)
    main.append(mainTop, mainCenter, mainBottom, mainCenterBottom, mainUnderBottom)
    mainTop.append(title, back)
    mainCenter.append(accountNumber, balanceContainer)
    balanceContainer.append(balance, balanceValue)
    mainBottom.append(bottomTitle, chartRender(res, true))
    mainCenterBottom.append(mainCenterTitle, inOutChart(res))
    mainUnderBottom.append(titleHistory, history)

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

    btn2.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate('accounts')
        router.on('/accounts', async () => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            setTimeout(async () => {
                document.body.append((await accountsRender()).header, (await accountsRender()).main)
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

    back.addEventListener('click', () => {
        document.body.innerHTML = ''
        router.navigate(`account/${res.account}`)
        router.on('/account/:id', async ({ data }) => {
            document.body.classList.add('spin')
            document.body.appendChild(createSpinner())
            const accountDetail = await getAccount(data.id, token)
                document.body.append(renderAccountDetail(accountDetail).header, renderAccountDetail(accountDetail).main)
                document.body.classList.remove('spin')
        }).resolve()
    })

    return {
        header,
        main
    }
}