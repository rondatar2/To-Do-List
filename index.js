const addBtn = document.querySelector('#add')
const text = document.querySelector('.input')
const ul = document.querySelector('#ul-el')
const list = document.getElementsByClassName('li')
const checkbtn = document.getElementsByClassName('check')
const closebtn = document.getElementsByClassName('close')
const listItem = document.getElementsByTagName('li')
const check = document.createElement('span')
const arrayFromLocalLi= JSON.parse(localStorage.getItem('li'))
let itemCheck = []
let newlist = []

let liArr = []
const bringDown = (list) => {
    let li = ''
    for (let i = 0; i < list.length; i++){
        li = 
        `
        <li>${list[i]}<span><button class= 'close'><i class="fa-solid fa-xmark"></i></button><button class= 'check'><i class="fa-sharp fa-solid fa-pen-to-square"></i></button></span></li> 
        ` + li
    }
    ul.innerHTML = li
}
if(arrayFromLocalLi) {
    liArr = arrayFromLocalLi
    bringDown(liArr)
}
const checkFunction = () => {
    for (let i = 0; i < checkbtn.length; i++) {
        checkbtn[i].addEventListener("click", function() {
            if (!itemCheck[i]){
                listItem[i].style.textDecoration = 'line-through';
                itemCheck[i] = true
            }
            else{
                listItem[i].style.textDecoration = 'none';
                itemCheck[i] = false
            }
        });
    }
}
checkFunction()

const newListtoliArr = () => {
    for(let i = 0; i < ul.children.length; i++){
        newlist.push(document.querySelectorAll('ul > li')[i].innerText)
    }
    liArr = newlist
    liArr.reverse()
    localStorage.setItem('li', JSON.stringify(liArr))
}

const closeFunction = () => {
    for (let i = 0; i < ul.children.length; i++) {
        closebtn[i].addEventListener("click", function(e) {
            newlist = []
            e.preventDefault()
            if (e.target.classList.contains('fa-xmark')){
                e.target.parentElement.parentElement.parentElement.remove()
                newListtoliArr()
            }
        });
    }
}
closeFunction()

addBtn.addEventListener('click', () => {
    add()
})

text.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add()
    }
})

const add = () => {
    if (text.value){
        if (text.value.length > 35){
            alert('Please input less than 35 letters')
        }
        else{
            liArr.push(text.value)
            text.value = ''
            bringDown(liArr)
            checkFunction()
            closeFunction()
            localStorage.setItem('li', JSON.stringify(liArr))
        }
    }
    else{
        alert('Please enter some text')
    }
}
