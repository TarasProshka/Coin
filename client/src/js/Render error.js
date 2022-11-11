export const errorRender = (message, err = 'error') => {
    const error = document.createElement('div')
    error.classList.add(err)
    error.textContent = message
    return error
}

export const errorAccountTransfer = (message, icon) => {
    const errorContainer = document.createElement('div')
    const errormessage = document.createElement('div')
    const errorIcon = document.createElement('img')
    errorContainer.classList.add('error-container')
    errormessage.classList.add('error-account-modal')
    errorIcon.classList.add('error-icon')
    errormessage.textContent = message
    errorIcon.src = icon
    errorContainer.append(errorIcon, errormessage)
    return errorContainer
}