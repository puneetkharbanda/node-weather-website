console.log('client side js file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
        
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error)
        {
            messageOne.textcontent= data.error
            //console.log(data.error)
        } else {
            //console.log(data.location)
            console.log(data.forecast)
            messageOne.textcontent = data.location
            messageTwo.textcontent = data.forecast
            console.log(data.location)
               }

    })
})
    //console.log(data.location)
})