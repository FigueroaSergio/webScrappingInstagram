

const searcher = document.getElementById("searcher")
const dataSpace = document.getElementById("dataSpace")
const fragment = document.createDocumentFragment()
const input = document.getElementById("nickname")
const cargando =document.getElementById("cargando")
const cargado =document.getElementById("cargado")

input.onkeypress=(e)=>{if(e.key=="Enter"){fecthSearch()}}

var count = 0
var prueba= {
    "name": 'avril_f99',
    "img": 'https://scontent-bog1-1.cdninstagram.com/v/t51.2885-19/s150x150/132003729_702077440451532_3433343025448042151_n.jpg?tp=1&_nc_ht=scontent-bog1-1.cdninstagram.com&_nc_ohc=nUzR9GaTPQoAX8oy_fS&ccb=7-4&oh=0e69d9ffb2aa595cda50d81d4af647bf&oe=6086E759&_nc_sid=7bff83',
    "media": '1',
    "followers": '214',
    "follow": '251',
    "posts": [
      {
        "url": 'https://www.instagram.com/p/BgogtQBnc9H/',
        "likes": '37',
        "date": '2018-03-22T16:56:17.000Z'
      }
    ]
  }
let search = document.getElementById("search")
search.onclick= fecthSearch
function fecthSearch(){
    
    const nickname= input.value
    input.value=""
    cargando.style.display = 'inline-block'
    cargado.style.display="none"
    search.disabled=true
    input.disabled=true
    let url =`/user/${nickname}`
    fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            sessionStorage.setItem(count.toString()
                , JSON.stringify(data))
            count++
            renderData(data)
        }).finally(()=>{
            cargando.style.display = 'none'
            cargado.style.display = 'inline-block'
            search.disabled=false
            input.disabled=false
            
        })

}

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
