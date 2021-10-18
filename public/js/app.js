const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const para1 = document.querySelector('#para1')
const para2 = document.querySelector('#para2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchelement.value

    para1.textContent='Wait while we are fetching data..'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para1.textContent = data.error

            } else {
                para1.textContent ='Showing data for ' + data.location
                para2.textContent = data.forecast
            }
        })
    })

})