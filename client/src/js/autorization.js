import { account, autorization } from './requests.js'
import { accountsRender } from './accounts.js'
import Navigo from 'navigo'
import { errorRender } from './Render error.js'
import logoCoin from '../assets/images/logo.png'
import '../style/normalize.scss'
import '../style/main.scss'
import { createSpinner } from './spinner.js'

export const loginRender = () => {
    document.body.innerHTML = ''
    const router = new Navigo('/')
    const header = document.createElement('header')
    const logo = document.createElement('img')
    const form = document.createElement('form')
    const title = document.createElement('h2')
    const logContainer = document.createElement('div')
    const logTitle = document.createElement('span')
    const logInput = document.createElement('input')
    const passwordContainer = document.createElement('div')
    const passwordTitle = document.createElement('span')
    const passwordInput = document.createElement('input')
    const btn = document.createElement('button')
    const logError = errorRender('Неверный логин')
    const passwordError = errorRender('Неверный пароль')
    header.classList.add('header')
    logo.classList.add('logo')
    form.classList.add('form')
    title.classList.add('title')
    logContainer.classList.add('input-container')
    logTitle.classList.add('input-title')
    logInput.classList.add('input')
    passwordContainer.classList.add('input-container')
    passwordTitle.classList.add('input-title')
    passwordInput.classList.add('input')
    btn.classList.add('btn')
    logo.src = logoCoin
    title.textContent = 'Вход в аккаунт'
    logTitle.textContent = 'Логин'
    passwordTitle.textContent = 'Пароль'
    logInput.placeholder = 'Введите свой логин'
    passwordInput.placeholder = 'Введите свой пароль'
    btn.textContent = 'Войти'
    header.append(logo)
    form.append(title, logContainer, passwordContainer, btn)
    logContainer.append(logTitle, logInput)
    passwordContainer.append(passwordTitle, passwordInput)

    form.addEventListener('submit', async e => {
        e.preventDefault()
        const error = await (await autorization(logInput.value, passwordInput.value)).error
        if (error === 'No such user' || logInput.value.length < 6) {
            logContainer.append(logError)
            logInput.classList.add('invalid')
        }
        if (error === 'Invalid password' || passwordInput.value.length < 6) {
            passwordContainer.append(passwordError)
            passwordInput.classList.add('invalid')
        } else if (error === '') {
            document.body.innerHTML = ''
            const token = await (await autorization(logInput.value, passwordInput.value)).payload.token
            localStorage.setItem('token', token)
            await account(localStorage.getItem('token'))
            router.navigate('accounts')
            router.on('/accounts', async () => {
                document.body.classList.add('spin')
                document.body.appendChild(createSpinner())

                document.body.append((await accountsRender()).header, (await accountsRender()).main)
                document.body.classList.remove('spin')

            }).resolve()
        }
    })

    logInput.addEventListener('input', () => {
        logInput.classList.remove('invalid')
        logError.remove()
    })

    passwordInput.addEventListener('input', () => {
        passwordInput.classList.remove('invalid')
        passwordError.remove()
    })

    return {
        header,
        form
    }
}