export const dateFormater = date => {
    const newDate = new Date(date)

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const result = newDate.toLocaleString('ru', options)
    return result
}

export const dateNumFormater = date => {
    const newDate = new Date(date)

    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    const result = newDate.toLocaleString('ru', options)
    return result
}

export const timeFormater = time => {
    const newTime = new Date(time)

    const options = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const result = newTime.toLocaleString('ru', options)
    return result
}