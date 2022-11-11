import logoCoin from '../assets/images/logo.png'
import Navigo from 'navigo'
import { loginRender } from './autorization.js'
import { accountsRender } from './accounts.js'
import { renderMyCurrencies } from './get my cyrrencies.js'
import { getMyCurrency } from './requests.js'
import { changeCurrency } from './change currencies.js'
import { websocket } from './websocket.js'
import { mapOfBanks } from './bank-map.js'
import { createSpinner } from './spinner.js'

export const renderCurrencyPage = async () => {
    document.body.innerHTML = ''
    const router = new Navigo('/')
    const token = localStorage.getItem('token')
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const btns = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const btn3 = document.createElement('button')
    const btn4 = document.createElement('button')
    const main = document.createElement('main')
    const title = document.createElement('h2')
    const mainTotal = document.createElement('div')
    const mainleft = document.createElement('div')
    const mainRight = document.createElement('div')
    const mainRightTitle = document.createElement('h3')
    header.classList.add('header', 'accounts-header', 'account-header')
    logo.classList.add('logo')
    btn1.classList.add('accounts-btn')
    btn2.classList.add('accounts-btn')
    btn3.classList.add('accounts-btn', 'accounts-btn-selected')
    btn4.classList.add('accounts-btn')
    main.classList.add('main')
    title.classList.add('main-top-title', 'custom-title')
    mainTotal.classList.add('main-total')
    mainleft.classList.add('main-total-left')
    mainRight.classList.add('main-total-right')
    mainRightTitle.classList.add('right-title', 'cus')
    logo.src = logoCoin
    btn1.textContent = 'Банкоматы'
    btn2.textContent = 'Счета'
    btn3.textContent = 'Валюта'
    btn4.textContent = 'Выйти'
    title.textContent = 'Валютный обмен'
    mainRightTitle.textContent = 'Изменение курсов в реальном времени'
    header.append(logo, btns)
    btns.append(btn1, btn2, btn3, btn4)
    main.append(title, mainTotal)
    mainTotal.append(mainleft, mainRight)
    mainleft.append(renderMyCurrencies(await getMyCurrency(token)).myCurrency, await changeCurrency())
    mainRight.append(mainRightTitle, websocket())

    btn1.addEventListener('click', () => {
        router.navigate('banks-map')
        router.on('/banks-map', async () => {
            document.body.classList.add('spin')
            document.body.append(createSpinner())
            window.addEventListener('load', () => {
                setTimeout(async () => {
                    document.body.innerHTML = ''
                    document.body.classList.remove('spin')
                    document.body.append((await mapOfBanks()).header, (await mapOfBanks()).main)
                }, 2000)
            })
        }).resolve()
    })

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

    return {
        header,
        main
    }
}