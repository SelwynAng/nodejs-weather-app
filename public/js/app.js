/*Client-side JS code on the frontend*/

const weatherForm = document.querySelector('form'); //Selecting the <form> element to store in weatherForm
const search = document.querySelector('input'); //Selecting the <input> element to store in search
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => { //Dictates what event happens once the submission of weatherForm
    e.preventDefault(); //Prevents the default state of the browser automatically refreshing in the event
    const location = search.value; //Storing the value of user input in location constant

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''; 

    //Fetching data from backend NodeJS to show up in the frontend client side Javascript
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => { //Parsing the response which comes back in a JSON format
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})