import { dateNumFormater } from "./dateFormat.js"
import Navigo from "navigo"
import { renderTransactionsDetail } from "./transaction history page.js"
import { getAccount } from "./requests.js"
import { renderPages } from "./page render.js"
import { createSpinner } from "./spinner.js"

export const renderTransferHistory = (data, full) => {
    const router = new Navigo('/')
    const token = localStorage.getItem('token')
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const th1 = document.createElement('th')
    const th2 = document.createElement('th')
    const th3 = document.createElement('th')
    const th4 = document.createElement('th')
    const tBody = document.createElement('tbody')
    const trBody = document.createElement('tr')
    const td = document.createElement('td')
    if (data.transactions.length === 0) {
        tBody.append(trBody)
        trBody.append(td)
        table.style.cursor = 'pointer'
        if (full) {
            table.style.cursor = 'default'
        }
    } else {
        if (!full) {
            table.style.cursor = 'pointer'
            const currentArray = data.transactions.reverse()
            for (let i = currentArray.length - 1; i >= currentArray.length - 10; i--) {
                if (currentArray[i] === undefined) {
                    continue
                }
                trBody.remove()
                const newTr = document.createElement('tr')
                const newTd1 = document.createElement('td')
                const newTd2 = document.createElement('td')
                const newTd3 = document.createElement('td')
                const newTd4 = document.createElement('td')
                newTr.classList.add('new-tr')
                newTd1.classList.add('new-td')
                newTd2.classList.add('new-td')
                newTd3.classList.add('new-td')
                newTd4.classList.add('new-td')
                newTd1.textContent = currentArray[i].from
                newTd2.textContent = currentArray[i].to
                newTd3.textContent = data.account === currentArray[i].from ? '-' +
                    currentArray[i].amount + ' ' + '₽' : '+' + currentArray[i].amount + ' ' + '₽'
                newTd4.textContent = dateNumFormater(currentArray[i].date)
                newTd3.textContent.includes('-') ? newTd3.classList.add('red') : newTd3.classList.add('green')
                tBody.append(newTr)
                newTr.append(newTd1, newTd2, newTd3, newTd4)
            }
        }
    }
    if (full && data.transactions.length > 10) {
        data.transactions !== [] ? table.classList.add('table-detail') : ''
        const currentArray = data.transactions
        let pages = Math.ceil(currentArray.length / 10)
        let pagesContainer = renderPages(pages).container
        tBody.append(pagesContainer)
        pagesContainer.querySelectorAll('.page').forEach((e, ind, arr) => {
            arr[0].classList.add('show')
            if (e.textContent > 5) {
                e.classList.add('remove')
            }
            e.addEventListener('click', () => {
                pagesContainer.querySelectorAll('.page').forEach(e => e.classList.contains('show')
                    ? e.classList.remove('show') : '')
                e.classList.add('show')
                const start = ind
                pagesContainer.querySelectorAll('.page').forEach(e => !e.classList.contains('remove')
                    ? e.classList.add('remove') : '')
                if (arr[start] && arr[start].classList.contains('remove')) {
                    arr[start].classList.remove('remove')
                }
                if (arr[start + 1] && arr[start + 1].classList.contains('remove')) {
                    arr[start + 1].classList.remove('remove')
                }
                if (arr[start + 2] && arr[start + 2].classList.contains('remove')) {
                    arr[start + 2].classList.remove('remove')
                }
                if (arr[start - 1] && arr[start - 1].classList.contains('remove')) {
                    arr[start - 1].classList.remove('remove')
                }
                if (arr[start - 2] && arr[start - 2].classList.contains('remove')) {
                    arr[start - 2].classList.remove('remove')
                }
                const repeats = Number(e.textContent)
                tBody.querySelectorAll('tr').forEach(e => e.remove())
                for (let i = currentArray.length - ((repeats * 10) - 9);
                    i >= currentArray.length - ((repeats * 10)); i--) {
                    if (currentArray[i] === undefined || i < 0) {
                        continue
                    }
                    trBody.remove()
                    const newTr = document.createElement('tr')
                    const newTd1 = document.createElement('td')
                    const newTd2 = document.createElement('td')
                    const newTd3 = document.createElement('td')
                    const newTd4 = document.createElement('td')
                    newTr.classList.add('new-tr')
                    newTd1.classList.add('new-td')
                    newTd2.classList.add('new-td')
                    newTd3.classList.add('new-td')
                    newTd4.classList.add('new-td')
                    newTd1.textContent = currentArray[i].from
                    newTd2.textContent = currentArray[i].to
                    newTd3.textContent = data.account === currentArray[i].from ? '-' +
                        currentArray[i].amount + ' ' + '₽' : '+' + currentArray[i].amount + ' ' + '₽'
                    newTd4.textContent = dateNumFormater(currentArray[i].date)
                    newTd3.textContent.includes('-') ? newTd3.classList.add('red') : newTd3.classList.add('green')
                    tBody.append(newTr)
                    newTr.append(newTd1, newTd2, newTd3, newTd4)
                }
            })
        })
        for (let i = currentArray.length - 1; i >= currentArray.length - 10; i--) {
            if (currentArray[i] === undefined) {
                continue
            }
            trBody.remove()
            const newTr = document.createElement('tr')
            const newTd1 = document.createElement('td')
            const newTd2 = document.createElement('td')
            const newTd3 = document.createElement('td')
            const newTd4 = document.createElement('td')
            newTr.classList.add('new-tr')
            newTd1.classList.add('new-td')
            newTd2.classList.add('new-td')
            newTd3.classList.add('new-td')
            newTd4.classList.add('new-td')
            newTd1.textContent = currentArray[i].from
            newTd2.textContent = currentArray[i].to
            newTd3.textContent = data.account === currentArray[i].from ? '-' +
                currentArray[i].amount + ' ' + '₽' : '+' + currentArray[i].amount + ' ' + '₽'
            newTd4.textContent = dateNumFormater(currentArray[i].date)
            newTd3.textContent.includes('-') ? newTd3.classList.add('red') : newTd3.classList.add('green')
            tBody.append(newTr)
            newTr.append(newTd1, newTd2, newTd3, newTd4)
        }
    } else if (full && data.transactions.length <= 10) {
        const currentArray = data.transactions
        for (let i = currentArray.length - 1; i >= currentArray.length - 10; i--) {
            if (currentArray[i] === undefined) {
                continue
            }
            trBody.remove()
            const newTr = document.createElement('tr')
            const newTd1 = document.createElement('td')
            const newTd2 = document.createElement('td')
            const newTd3 = document.createElement('td')
            const newTd4 = document.createElement('td')
            newTr.classList.add('new-tr')
            newTd1.classList.add('new-td')
            newTd2.classList.add('new-td')
            newTd3.classList.add('new-td')
            newTd4.classList.add('new-td')
            newTd1.textContent = currentArray[i].from
            newTd2.textContent = currentArray[i].to
            newTd3.textContent = data.account === currentArray[i].from ? '-' +
                currentArray[i].amount + ' ' + '₽' : '+' + currentArray[i].amount + ' ' + '₽'
            newTd4.textContent = dateNumFormater(currentArray[i].date)
            newTd3.textContent.includes('-') ? newTd3.classList.add('red') : newTd3.classList.add('green')
            tBody.append(newTr)
            newTr.append(newTd1, newTd2, newTd3, newTd4)
        }
    }
    table.classList.add('history-table')
    thead.classList.add('history-thead')
    tr.classList.add('histoty-tr')
    th1.classList.add('history-th')
    th2.classList.add('history-th')
    th3.classList.add('history-th')
    th4.classList.add('history-th')
    tBody.classList.add('history-body')
    trBody.classList.add('history-tr-body')
    td.classList.add('empty-td')
    th1.textContent = 'Счёт отправителя'
    th2.textContent = 'Счёт получателя'
    th3.textContent = 'Сумма'
    th4.textContent = 'Дата'
    td.textContent = 'История переводов этого пользователя пуста'
    table.append(thead, tBody)
    thead.append(tr)
    tr.append(th1, th2, th3, th4)

    if (!full) {
        table.addEventListener('click', () => {
            document.body.innerHTML = ''
            router.navigate(`account/${data.account}/transactions-history`)
            router.on('/account/:id/transactions-history', async ({ data }) => {
                document.body.classList.add('spin')
                document.body.appendChild(createSpinner())
                setTimeout(async () => {
                    document.body.classList.remove('spin')
                    const token = localStorage.getItem('token')
                    const accountDetail = await getAccount(data.id, token)
                    document.body.append(renderTransactionsDetail(accountDetail).header,
                        renderTransactionsDetail(accountDetail).main)
                    document.body.classList.remove('spin')
                }, 1000)
            }).resolve()
        })
    }

    return table
}