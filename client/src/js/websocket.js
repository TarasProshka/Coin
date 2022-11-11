export const websocket = () => {
    const socket = new WebSocket('ws://localhost:3000/currency-feed')
    const current = []
    const container = document.createElement('div')
    container.classList.add('change')
    const fake = [['NZD', 'CNH', 66.8, 1], ['BTC', 'ETH', 13.23, 1], ['RUB', 'USD', 52.7, 1], ['BYR', 'CAD', 19.44, -1],
    ['AUD', 'EUR', 47.25, -1], ['CAD', 'HKD', 74.26, 1], ['GBP', 'CHF', 71, -1], ['USD', 'BTC', 91.42, 1],
    ['CNH', 'ETH', 17, -1], ['BKO', 'DOA', 92.11, 1], ['RUB', 'DEN', 19.21, -1], ['DNB', 'EUR', 48.21, 1]]
    for (let i = 0; i < fake.length; i++) {
        const elem = document.createElement('div')
        const fromTo = document.createElement('div')
        const border = document.createElement('div')
        const rate = document.createElement('div')
        const icon = document.createElement('div')
        const increase = `
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/>
            </svg>`
        const decrease = `
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/>
            </svg>`
        elem.classList.add('elem')
        fromTo.classList.add('from-to')
        border.classList.add('border', fake[i][3] === 1 ? 'green-change' : 'red-change', 'current-color')
        rate.classList.add('rate')
        fromTo.textContent = fake[i][0] + '/' + fake[i][1]
        rate.textContent = fake[i][2]
        icon.innerHTML = fake[i][3] === 1 ? increase : decrease
        container.append(elem)
        elem.append(fromTo, border, rate, icon)
    }
    socket.onmessage = function (e) {
        container.querySelectorAll('.elem')[0].remove()
        const currentData = JSON.parse(e.data)
        current.push([currentData.from, currentData.to, currentData.rate, currentData.change])
        const elem = document.createElement('div')
        const fromTo = document.createElement('div')
        const border = document.createElement('div')
        const rate = document.createElement('div')
        const icon = document.createElement('div')
        const increase = `
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10L10 0L0 10L20 10Z" fill="#76CA66"/>
            </svg>`
        const decrease = `
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L10 10L20 0H0Z" fill="#FD4E5D"/>
            </svg>`
        elem.classList.add('elem')
        fromTo.classList.add('from-to')
        border.classList.add('border', currentData.change === 1 ? 'green-change' : 'red-change', 'current-color')
        rate.classList.add('rate')
        fromTo.textContent = currentData.from + '/' + currentData.to
        rate.textContent = currentData.rate
        icon.innerHTML = currentData.change === 1 ? increase : decrease
        container.append(elem)
        elem.append(fromTo, border, rate, icon)
    }
    return container
}
