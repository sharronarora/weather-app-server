const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response => {
        console.log(response, 'response');
        response
        .clone()
        .json()
        .catch(() => response.text())
        .then((data) => {
            if(!data.location){
                messageOne.textContent = data;
            }else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    }));
});