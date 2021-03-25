

const searcher = document.getElementById("searcher")
const dataSpace = document.getElementById("dataSpace")
const fragment = document.createDocumentFragment()
var count = 0
var prueba= {
   "name": 'sergio._.figal',
   "img": 'https://scontent-bog1-1.cdninstagram.com/v/t51.2885-19/s150x150/83543824_586934628522925_8240128626935201792_n.jpg?tp=1&_nc_ht=scontent-bog1-1.cdninstagram.com&_nc_ohc=k_WeB059zlQAX9v13P6&ccb=7-4&oh=c72196ce84e7707d92d7cf0a995b4933&oe=6084A8CA&_nc_sid=7bff83',
   "media": '6',
   "followers": '67',
   "follow": '93'
 }
searcher.addEventListener("submit", event => {
    const nickname = document.getElementById("nickname").value
    event.preventDefault()
    // renderData(prueba)
    fetch(`/user/${nickname}`, {
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
    let card = document.createElement("div")
    card.classList.add("card", "text-white", "datacard")
    
    let row1= document.createElement("div")
    row1.classList.add("row","align-items-center")
    let divImg =document.createElement("div")
    divImg.classList.add("col-12", "col-sm-4","col-md-2", "col-lg-1")
    
    let img= document.createElement("img")
    img.classList.add("img-fluid","imgRound")
    img.src = person.img
    divImg.appendChild(img)
    row1.appendChild(divImg)


    let divInfo= document.createElement("div")
    divInfo.classList.add("col-12", "col-sm-8", "col-md-10","col-lg-11" ,"justify-content-center")
    let row2= document.createElement("div")
    row2.classList.add("row" ,"align-items-center")
    let datos = []
    datos.push(person.name)
    datos.push(person.media)
    datos.push(person.followers)
    datos.push(person.follow)
    
    let info=["Nombre: ","Publicaciones: ","Seguidores: ","Seguidos: "]
    for( n in datos){
        let div = document.createElement("div")
        div.classList.add("col-12","col-sm-6", "col-md-3")
        let h5 = document.createElement("h5")
        h5.textContent=info[n]+datos[n]
        div.appendChild(h5)
        row2.appendChild(div)
    }
    divInfo.appendChild(row2)
    row1.appendChild(divInfo)
    card.appendChild(row1)
    
     


    
    fragment.appendChild(card)
    dataSpace.appendChild(fragment)
}
