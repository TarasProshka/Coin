import { loginRender } from "./autorization.js";
import { accountsRender } from './accounts.js'
import Navigo from 'navigo'
import { getAccount } from "./requests.js";
import { renderAccountDetail } from "./account details.js";
import { renderTransactionsDetail } from "./transaction history page.js";
import { renderCurrencyPage } from "./currency page.js";
import { mapOfBanks } from "./bank-map.js";
import { createSpinner } from "./spinner.js";

const router = new Navigo('/')

router.on('/', () => {
    document.body.classList.add('spin')
    document.body.append(createSpinner())
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.innerHTML = ''
            document.body.classList.remove('spin')
            document.body.append(loginRender().header, loginRender().form)
        }, 2000)
    })
}).resolve()

router.on('/accounts', async () => {
    document.body.classList.add('spin')
    document.body.append(createSpinner())
    window.addEventListener('load', () => {
        setTimeout(async () => {
            document.body.innerHTML = ''
            document.body.classList.remove('spin')
            document.body.append((await accountsRender()).header, (await accountsRender()).main)
        }, 2000)
    })
}).resolve()

router.on('/account/:id', async ({ data }) => {
    document.body.classList.add('spin')
    document.body.append(createSpinner())
    window.addEventListener('load', () => {
        setTimeout(async () => {
            document.body.innerHTML = ''
            document.body.classList.remove('spin')
            const token = localStorage.getItem('token')
            const accountDetail = await getAccount(data.id, token)
            document.body.append(renderAccountDetail(accountDetail).header, renderAccountDetail(accountDetail).main)
        }, 2000)
    })
}).resolve()

router.on('/account/:id/transactions-history', async ({ data }) => {
    document.body.classList.add('spin')
    document.body.append(createSpinner())
    window.addEventListener('load', () => {
        setTimeout(async () => {
            document.body.innerHTML = ''
            document.body.classList.remove('spin')
            const token = localStorage.getItem('token')
            const accountDetail = await getAccount(data.id, token)
            document.body.append(renderTransactionsDetail(accountDetail).header, renderTransactionsDetail(accountDetail).main)
        }, 2000)
    })
}).resolve()

router.on('/available-currency', async () => {
    document.body.classList.add('spin')
    document.body.append(createSpinner())
    window.addEventListener('load', () => {
        setTimeout(async () => {
            document.body.innerHTML = ''
            document.body.classList.remove('spin')
            document.body.append((await renderCurrencyPage()).header, (await renderCurrencyPage()).main)
        }, 2000)
    })
}).resolve()

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