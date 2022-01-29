console.log('client side js is loaded sucessfully!')

// fetch('https://puzzle.mead.io/puzzle').then( (response) => { 
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })

// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/vartej.json?access_token=pk.eyJ1IjoicHJpeWFuazIxIiwiYSI6ImNreWxmZ3hpeDM1bmcycHA4bDlxYjFldmEifQ.iLiNR8FpjdSRbaN4RpWg7g&limit=1').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()    // this will stop browser to refresh defaultly...

    const address = search.value

    messageOne.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                // console.log(data.error)
            }
            else{
                messageOne.textContent = data.location
                messagetwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.temp)
            }
        })
    })

    // console.log(address)
})