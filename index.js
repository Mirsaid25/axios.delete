let wrapper = document.createElement('div')
let text = document.createElement('h1')
let grid = document.createElement('div')
let form = document.forms.frm
let btn = document.querySelector('button')
let url = "http://localhost:3001"
let num

function getData(params) {
    axios.get(url + "/todos")
        .then(res => {
            if( res.status === 200 || res.status === 201){
                reload(res.data)
            }
        })
}
getData()

form.onsubmit = (event) => {
    event.preventDefault()

    let get = {
        isDone: false,
        time: new Date().getHours() + ':' + new Date().getMinutes()

    }

    let fm = new FormData(form)
    fm.forEach((value, key) => {
        get[key] = value
    })
console.log(get);
    axios.post(url + "/todos", get)
        .then(res => {
            if( res.status === 200 || res.status === 201){
                getData()
            }
        })

}

function reload(arr) {
    grid.innerHTML = ""

    for (let info of arr) {
        // a create
        let item = document.createElement('item')
        let text2 = document.createElement('h2')
        let paragraph = document.createElement('p')
        let img = document.createElement('img')
        // b decor
        item.classList.add('item')

        info.isDone ? item.classList.add('item_done') : console.log()

        text2.classList.add('text2')
        text2.innerHTML = info.task
        paragraph.classList.add('paragraph')
        paragraph.innerHTML = info.time
        img.classList.add('image')
        img.src = "./img/delete_icon.svg"
        // c add
        grid.append(item)
        item.append(text2)
        item.append(paragraph)
        item.append(img)

        // functions
        img.onclick = () => {
            axios.delete(url + "/todos/" + info.id)
                .then(res=> {
                    if(res.status === 200 || res.status === 201){
                        getData()
                    }
                })
                
        }

        text2.onclick = () => {
            
        }

    }
}


// reload(todos)





// b decor
wrapper.classList.add('wrapper')
text.innerHTML = 'Todo List'
text.classList.add('text')
grid.classList.add('grid')

//  c add
wrapper.append(text, grid,)
document.body.prepend(wrapper)
