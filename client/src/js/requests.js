export const autorization = async (login, password) => {
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            password: password
        })
    })
    const data = await res.json()
    return {
        error: data.error,
        payload: data.payload
    }
}

export const account = async token => {
    const res = await fetch(`http://localhost:3000/accounts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
    })
    const data = await res.json()
    return data
}

export const createAccount = async token => {
    const res = await fetch('http://localhost:3000/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const getAccount = async (id, token) => {
    const res = await fetch(`http://localhost:3000/account/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const transfer = async (token, fromValue, toValue, amountValue) => {
    const res = await fetch(`http://localhost:3000/transfer-funds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify({
            from: fromValue,
            to: toValue,
            amount: amountValue
        })
    })
    const data = await res.json()
    return data
}

export const getMyCurrency = async token => {
    const res = await fetch(`http://localhost:3000/currencies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    })
    const data = await res.json()
    return data
}

export const getChangeCurrency = async (token, fromValue, toValue, amountValue) => {
    const res = await fetch(`http://localhost:3000/currency-buy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        },
        body: JSON.stringify({
            from: fromValue,
            to: toValue,
            amount: amountValue
        })
    })
    const data = await res.json()
    return data
}

export const getBanks = async () => {
    const res = await fetch(`http://localhost:3000/banks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json()
    return data
}