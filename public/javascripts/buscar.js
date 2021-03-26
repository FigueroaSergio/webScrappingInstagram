

const searcher = document.getElementById("searcher")
const dataSpace = document.getElementById("dataSpace")
const fragment = document.createDocumentFragment()
const input = document.getElementById("nickname")
const cargando = document.getElementById("cargando")
const cargado = document.getElementById("cargado")
const search = document.getElementById("search")
var fGraph = document.getElementById('fGraph').getContext('2d');
// var sGraph = document.getElementById('sGraph').getContext('2d');

input.onkeypress = (e) => { if (e.key == "Enter") { fecthSearch() } }

var count = 0


search.onclick = fecthSearch

function fecthSearch() {

    const nickname = input.value
    input.value = ""
    cargando.style.display = 'inline-block'
    cargado.style.display = "none"
    search.disabled = true
    input.disabled = true
    let url = `/user/${nickname}`
    fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            if (data.error != null) {
                alert(data.error)
            }
            else {
                console.log(data)
                datos.push(data)
                count++
                renderData(data)
                renderInfo(datos)
            }

        }).finally(() => {
            cargando.style.display = 'none'
            cargado.style.display = 'inline-block'
            search.disabled = false
            input.disabled = false

        })

}

function renderData(person) {
    let card = document.createElement("div")
    card.classList.add("card", "text-white", "datacard")

    let row1 = document.createElement("div")
    row1.classList.add("row", "align-items-center")
    let divImg = document.createElement("div")
    divImg.classList.add("col-12", "col-sm-4", "col-md-2", "col-lg-1")

    let img = document.createElement("img")
    img.classList.add("img-fluid", "imgRound")
    img.src = person.img
    divImg.appendChild(img)
    row1.appendChild(divImg)


    let divInfo = document.createElement("div")
    divInfo.classList.add("col-12", "col-sm-8", "col-md-10", "col-lg-11", "justify-content-center")
    let row2 = document.createElement("div")
    row2.classList.add("row", "align-items-center")
    let datos = []
    datos.push(person.name)
    datos.push(person.media)
    datos.push(person.followers)
    datos.push(person.follow)

    let info = ["Nombre: ", "Publicaciones: ", "Seguidores: ", "Seguidos: "]
    for (n in datos) {
        let div = document.createElement("div")
        div.classList.add("col-12", "col-sm-6", "col-md-3")
        let h5 = document.createElement("h5")
        h5.textContent = info[n] + datos[n]
        div.appendChild(h5)
        row2.appendChild(div)
    }
    divInfo.appendChild(row2)
    row1.appendChild(divInfo)
    card.appendChild(row1)





    fragment.appendChild(card)
    dataSpace.appendChild(fragment)
}
function getDates(person) {
    dates = []
   
    posts=person.posts.reverse()
    for (post of posts) {
        dates.push(Date.parse(post.date))
        
    }
    return  dates
}
function graficar(x,y, ctx) {
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: x,
            datasets: y
        },

        // Configuration options go here
        options: {}
    });
}
function joinDateLike(person, dates){
    posts=person.posts.reverse()
    let indexs=[]
    for(post of posts)
    {  
        let i = dates.indexOf(Date.parse(post.date))
        indexs.push(i)

    }
    // console.log(indexs)
    let newDataset=[]
    for(let i in dates){
        newDataset.push(0)
    }
    // console.log(newDataset)
    for(let i in indexs){
        newDataset[indexs[i]]=parseInt(posts[i].likes)
    }
    // console.log(newDataset)
    let r=getRandomArbitrary()
    let g=getRandomArbitrary()
    let b=getRandomArbitrary()
    return{"label":person.name,"data":newDataset,"borderColor": `rgb(${r}, ${g}, ${b})`}
}
function renderInfo(data){
    let allDates=[]
    for(person of data){
        publishDate=getDates(person)
        allDates= allDates.concat(publishDate)
    }
    // console.log(allDates)
    allDates.sort(function(a, b){return a-b})
    let orderDates=[]
    for(date of allDates){
        orderDates.push(date)
    }
    let points=[]
    for(person of data){
        points.push(joinDateLike(person,orderDates))
    }
    console.log(orderDates)
    allDates=[]
    for(date of orderDates)
    {
        allDates.push(new Date(date).toLocaleDateString())
    }
    console.log(points)
    graficar(allDates,points,fGraph)
}
function getRandomArbitrary() {
    return Math.random() * (250-20)+20;
  }
var avy = {
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
var sergio={
    "name": "sergio._.figal",
    "img": "https://scontent-bog1-1.cdninstagram.com/v/t51.2885-19/s150x150/83543824_586934628522925_8240128626935201792_n.jpg?tp=1&_nc_ht=scontent-bog1-1.cdninstagram.com&_nc_ohc=sk9paPNXpgUAX_rQ9ID&ccb=7-4&oh=d2e11b79a83c792895944fc24bdd0757&oe=6084A8CA&_nc_sid=7bff83",
    "media": "6",
    "followers": "67",
    "follow": "93",
    "posts": [
        {
            "url": "https://www.instagram.com/p/CMvVEa0H1PI/",
            "likes": "37",
            "date": "2021-03-22T23:30:36.000Z"
        },
        {
            "url": "https://www.instagram.com/p/CJBv5dyHe2m/",
            "likes": "32",
            "date": "2020-12-20T17:05:48.000Z"
        },
        {
            "url": "https://www.instagram.com/p/CBRrdsHH26D/",
            "likes": "28",
            "date": "2020-06-11T01:23:45.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B-7jsQMHQ5D/",
            "likes": "36",
            "date": "2020-04-13T18:09:45.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B7el-mkg3bQ/",
            "likes": "18",
            "date": "2020-01-18T22:37:34.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B7ek1_EgQ6W/",
            "likes": "10",
            "date": "2020-01-18T22:27:40.000Z"
        }
    ]
}
var manu={
    "name": "manu_zulu",
    "img": "https://scontent-bog1-1.cdninstagram.com/v/t51.2885-19/s150x150/49656674_1673455239423232_1233919219100286976_n.jpg?tp=1&_nc_ht=scontent-bog1-1.cdninstagram.com&_nc_ohc=w6Gq4XIOrbQAX-l38EX&edm=ABfd0MgAAAAA&ccb=7-4&oh=4c9b0216bd4cd2d54ce709489946f5bd&oe=60882F4A&_nc_sid=7bff83",
    "media": "23",
    "followers": "423",
    "follow": "818",
    "posts": [
        {
            "url": "https://www.instagram.com/p/8aGlYlpszV/",
            "likes": "26",
            "date": "2015-10-04T07:48:27.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BCtWXiXps-h/",
            "likes": "23",
            "date": "2016-03-08T22:20:19.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BKNkak4DzMO/",
            "likes": "27",
            "date": "2016-09-11T10:18:31.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BLA0YCQjsC5/",
            "likes": "38",
            "date": "2016-10-01T07:59:15.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BN5ISbLjZcn/",
            "likes": "31",
            "date": "2016-12-11T21:53:30.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BN5IlydjKCc/",
            "likes": "38",
            "date": "2016-12-11T21:56:09.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BS3YIPbjPav/",
            "likes": "60",
            "date": "2017-04-14T12:10:25.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BdddVwXDo_W/",
            "likes": "56",
            "date": "2018-01-02T20:21:02.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BddeMlvjo91/",
            "likes": "68",
            "date": "2018-01-02T20:28:31.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BhKfm_OhIjb/",
            "likes": "71",
            "date": "2018-04-04T21:40:52.000Z"
        },
        {
            "url": "https://www.instagram.com/p/Bmgw2yGhWLT/",
            "likes": "85",
            "date": "2018-08-15T19:51:50.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BpLfvf0n30D/",
            "likes": "73",
            "date": "2018-10-21T03:12:25.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BppKXLjHXct/",
            "likes": "68",
            "date": "2018-11-01T15:42:49.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BsjSA89HCa9/",
            "likes": "94",
            "date": "2019-01-12T22:28:25.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BvuuVXbHKjS/",
            "likes": "93",
            "date": "2019-04-01T22:41:42.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BxEKNKrHess/",
            "likes": "77",
            "date": "2019-05-05T03:00:42.000Z"
        },
        {
            "url": "https://www.instagram.com/p/BxI26z8nBxn/",
            "likes": "75",
            "date": "2019-05-06T22:48:22.000Z"
        },
        {
            "url": "https://www.instagram.com/p/ByDzEStndv4/",
            "likes": "72",
            "date": "2019-05-29T20:09:54.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B08t5UUni25/",
            "likes": "78",
            "date": "2019-08-09T15:44:13.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B3OOgn0nU0t/",
            "likes": "106",
            "date": "2019-10-05T03:59:05.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B5apRBqnTYN/",
            "likes": "127",
            "date": "2019-11-28T16:46:33.000Z"
        },
        {
            "url": "https://www.instagram.com/p/B_gtsXOntNM/",
            "likes": "137",
            "date": "2020-04-28T04:29:03.000Z"
        },
        {
            "url": "https://www.instagram.com/p/CHCPLHBH7aa/",
            "likes": "76",
            "date": "2020-11-01T04:36:18.000Z"
        }
    ]
}
var datos=[]