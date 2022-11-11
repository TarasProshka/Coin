import { dateNumFormater, timeFormater } from "./dateFormat.js";

export const sortAccountsBy = (data, prop) => {
    if (prop.textContent !== 'По последней транзакции') {
        return data.sort((a, b) => a[prop.id] < b[prop.id] ? -1 : 1)
    } else {
        const NoTransactions = []
        const transactions = []
        data.forEach(i => {
            if (i[prop.id][0] === undefined) {
                NoTransactions.push(i)
            } else {
                transactions.push(i)
            }
        })
        transactions.sort((a, b) => {
            const currentTime = timeFormater(a[prop.id][0].date).replace(':', '')
            const currentDate = dateNumFormater(a[prop.id][0].date).replace(/\s/g, '').split('.')
            let switchIndex = currentDate[0]
            currentDate[0] = currentDate[2]
            currentDate[2] = switchIndex
            const currentValue = currentDate.map(i => Number(i)).join('')
            const current = currentValue + currentTime
            const currentTime2 = timeFormater(b[prop.id][0].date).replace(':', '')
            const currentDate2 = dateNumFormater(b[prop.id][0].date).replace(/\s/g, '').split('.')
            let switchIndex2 = currentDate2[0]
            currentDate2[0] = currentDate2[2]
            currentDate2[2] = switchIndex2
            const currentValue2 = currentDate2.map(i => Number(i)).join('')
            const current2 = currentValue2 + currentTime2
            return current < current2 ? -1 : 1
        })
        return {
            empty: NoTransactions,
            sortered: transactions
        }
    }
}