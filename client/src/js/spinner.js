export const createSpinner = () => {
    const spinner = document.createElement('span')
    spinner.classList.add('loader')
    return spinner
}