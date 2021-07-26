let urlQuoteList = 'http://localhost:3000/quotes'
let urlLikes = 'http://localhost:3000/users'

document.addEventListener("DOMContentLoaded", function() {
    fetchList()
    submitForm()

});

function fetchList(){
    fetch(urlQuoteList)
        .then(resp => resp.json())
        .then(data => data.forEach(element => renderQuote(element)))
}

function renderQuote(element){
    console.log(element)
    let ul = document.querySelector('#quote-list');

    let li = document.createElement('li')
    li.setAttribute('class', 'quote-card')

    let blockquote = document.createElement('blockquote')
    blockquote.setAttribute('class', 'blockquote')

    let p = document.createElement('p')
    p.setAttribute('class', 'mb-0')
    p.innerText = element.quote

    let footer = document.createElement('footer')
    footer.setAttribute('class', 'blockquote-footer')
    footer.innerText = element.author

    let br = document.createElement('br')

    let btn = document.createElement('button')
    btn.setAttribute('class', 'btn-success')
    let span = document.createElement('span')
    

    btn.innerText = `Likes: ${span.innerText}`

    btn.addEventListener('click', e => {
        e.preventDefault()
        console.log(e.target.dataset)
        
        fetch('http://localhost:3000/likes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        
            },
            body: JSON.stringify({
                quoteId : element.id
            })
            })
            .then(res => res.json())
            .then((like_obj => {
            span.innerText = '1'
            }))
    })

    let btn2 = document.createElement('button')
    btn2.innerText = 'Delete'
    btn2.setAttribute('class', 'btn-danger')
    
    btn2.addEventListener('click', (e) => {
        //e.target.parentNode.remove()
        e.target.parentNode.parentNode.remove()
        console.log('Delete')
    })



    //btn.append(span)
    blockquote.append(p, footer, br, btn, btn2)
    li.appendChild(blockquote)
    ul.appendChild(li)
}

function submitForm(){
    let form =  document.querySelector('#new-quote-form')
    let input1 =  document.querySelector('#new-quote')
    let input2 = document.querySelector('#author')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let newQuoteObj = {
            quote : `${input1.value}`,
            author : `${input2.value}`
        }
        postNewQuote(newQuoteObj)
    })
}

function postNewQuote(newQuoteObj){
    fetch(urlQuoteList, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body : JSON.stringify(newQuoteObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}


