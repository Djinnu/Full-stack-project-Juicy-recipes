const del = document.querySelectorAll('.fa-trash')
const like = document.querySelectorAll('.fa-thumbs-up')

Array.from(del).forEach(x => x.addEventListener('click', deleteComment))
Array.from(like).forEach(x => x.addEventListener('click', likeComment))

async function deleteComment() {
    const id = this.dataset.id
    try {
        const response = await fetch('/comment/deleteComment', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': id
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function likeComment() {
    let count = this.nextElementSibling.innerHTML
    const id = this.dataset.id
    try {
        const response = await fetch('/comment/likeComment', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': id
            })
        })
        const data = await response.json()
        const element = document.querySelector(`[data-id="${id}"]`)
        const elementCount = Number(count)
        element.classList.contains("fa-solid") ? this.nextElementSibling.innerHTML = elementCount - 1 : this.nextElementSibling.innerHTML = elementCount + 1
        element.className == "fa-solid fa-thumbs-up" ? element.className = "fa-regular fa-thumbs-up" : element.className = "fa-solid fa-thumbs-up"
    } catch(err) {
        console.log(err)
    }
}