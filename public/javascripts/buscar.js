

const searcher = document.getElementById("searcher")
const dataSpace = document.getElementById("dataSpace")
const fragment = document.createDocumentFragment()
var count = 0
searcher.addEventListener("submit", event => {
    const nickname = document.getElementById("nickname").value
    event.preventDefault()
    fetch(`/${nickname}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            sessionStorage.setItem(count.toString()
                , JSON.stringify(data))
            count++
            renderData(data)
        })

})
function renderData(person) {

    let datos = document.createElement("table")
    let row= document.createElement("tr")
    let imgSpace = document.createElement("td")
    let img = document.createElement("img")
    img.classList.add("imgRound")
    img.src = person.img

    let name = document.createElement("td") 
    name.textContent =  person.name

    let media = document.createElement("td") 
    media.textContent = "Publicaciones: "+ person.media

    let follow = document.createElement("td") 
    follow.textContent = "Seguidos: "+ person.follow

    let followers = document.createElement("td") 
    followers.textContent = "Seguidores: "+ person.followers

    
    imgSpace.appendChild(img)
    
    row.appendChild(imgSpace)
    row.appendChild(name)
    row.appendChild(media)
    row.appendChild(follow)
    row.appendChild(followers)
    datos.appendChild(row)
    
    fragment.appendChild(datos)
    dataSpace.appendChild(fragment)
}
