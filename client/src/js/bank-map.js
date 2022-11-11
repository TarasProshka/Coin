import logoCoin from '../assets/images/logo.png'
import Navigo from 'navigo'
import { loginRender } from './autorization.js'
import { accountsRender } from './accounts.js'
import { renderCurrencyPage } from './currency page.js'
import { createMap } from './map.js'
import { createSpinner } from './spinner.js'

export const mapOfBanks = async () => {
    document.body.innerHTML = ''
    const router = new Navigo('/')
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const btns = document.createElement('div')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    const btn3 = document.createElement('button')
    const btn4 = document.createElement('button')
    const main = document.createElement('main')
    const title = document.createElement('h2')
    header.classList.add('header', 'accounts-header', 'account-header')
    logo.classList.add('logo')
    btn1.classList.add('accounts-btn', 'accounts-btn-selected')
    btn2.classList.add('accounts-btn')
    btn3.classList.add('accounts-btn')
    btn4.classList.add('accounts-btn')
    main.classList.add('main')
    title.classList.add('main-top-title', 'custom-title')
    logo.src = logoCoin
    btn1.textContent = 'Банкоматы'
    btn2.textContent = 'Счета'
    btn3.textContent = 'Валюта'
    btn4.textContent = 'Выйти'
    title.textContent = 'Карта банкоматов'
    header.append(logo, btns)
    btns.append(btn1, btn2, btn3, btn4)
    main.append(title, await createMap())

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

    return {
        header,
        main
    }
}