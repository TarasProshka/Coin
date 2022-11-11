import { errorRender, errorAccountTransfer } from "./Render error.js"
import { transfer } from "./requests.js"
import error from '../assets/images/error.svg'
import successfully from '../assets/images/success.png'

export const transferCheck = async (token, from, to, amount, contNum, contSum, btn, res) => {
    const account = await transfer(token, from, to.value, 'check')
    const notTo = errorRender('Неверный номер счета', 'error-transfer')
    const overAmount = errorAccountTransfer('Недостаточно средств на счету', error)
    const success = errorAccountTransfer('Перевод успешен', successfully)
    const overAmountInput = errorRender('Неверная сумма перевода', 'error-transfer')
    const overAmountInput2 = errorRender('Неверная сумма перевода', 'error-transfer')
    const min = errorRender('Минимальная сумма перевода 500₽', 'error-transfer')
    if (account.error === 'Invalid account to' || !to.value) {
        if (!to.classList.contains('invalid-2')) {
            contNum.append(notTo)
            to.classList.add('invalid-2')
        }
    }
    if (!amount.value || !/^[0-9]+$/g.test(amount.value)) {
        if (!amount.classList.contains('invalid-2')) {
            contSum.append(overAmountInput2)
            amount.classList.add('invalid-2')
        }
    }
    if (amount.value > res.balance) {
        if (!amount.classList.contains('invalid-2')) {
            document.body.append(overAmount)
            setTimeout(() => overAmount.remove(), 4000)
            contSum.append(overAmountInput)
            amount.classList.add('invalid-2')
        }
    }
    if (amount.value < 500 && /\d/g.test(amount.value)) {
        if (!amount.classList.contains('invalid-2')) {
            contSum.append(min)
            amount.classList.add('invalid-2')
        }
    } else if (!to.classList.contains('invalid-2') && !amount.classList.contains('invalid-2')
        && account.error === 'Invalid amount' && amount.value <= res.balance) {
        await transfer(token, from, to.value, amount.value)
        if (localStorage.getItem(from) !== null) {
            const autoArray = JSON.parse(localStorage.getItem(from))
            if (!autoArray.includes(to.value)) {
                autoArray.push(to.value)
            }
            localStorage.setItem(from, JSON.stringify(autoArray))
        } else {
            const autoArray = []
            autoArray.push(to.value)
            localStorage.setItem(from, JSON.stringify(autoArray))
        }
        btn.disabled = true
        document.body.append(success)
        amount.value = ''
        to.value = ''
        setTimeout(() => {
            success.remove()
            btn.disabled = false
        }, 4000)
    }

    to.addEventListener('input', () => {
        to.classList.remove('invalid-2')
        if (notTo) notTo.remove()
    })

    amount.addEventListener('input', () => {
        amount.classList.remove('invalid-2')
        if (overAmountInput) overAmountInput.remove()
        if (min) min.remove()
        if (overAmountInput2) overAmountInput2.remove()
    })
}