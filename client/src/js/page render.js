export const renderPages = val => {
    const container = document.createElement('div')
    const arr = []
    container.classList.add('page-container')
    for (let i = 1; i <= val; i++) {
        const page = document.createElement('button')
        page.classList.add('page')
        page.textContent = i
        container.append(page)
        arr.push(page)
    }
    return {
        container,
        arr
    }
}