

const buscador = document.getElementById("search")

buscador.addEventListener("submit", event => {
    const person = document.getElementById("person").value
    event.preventDefault()
    fetch(`/${person}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            sessionStorage.setItem("datos",JSON.stringify(data))
        })
    

})
