/*Client-side JS code on the frontend*/

const weatherForm = document.querySelector('form'); //Selecting the <form> element to store in weatherForm
const search = document.querySelector('input'); //Selecting the <input> element to store in search
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const messageThree = document.querySelector('#message-three');

weatherForm.addEventListener('submit', (e) => { //Dictates what event happens once the submission of weatherForm
    e.preventDefault(); //Prevents the default state of the browser automatically refreshing in the event
    const location = search.value; //Storing the value of user input in location constant

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''; 
    if (messageThree.hasChildNodes()) { 
        //To check if messageThree already has an image child element. If have, remove the image, 
        //or else the image from the previous request is going to remain on the page
        messageThree.removeChild(messageThree.firstChild);
    }

    //Fetching data from backend NodeJS to show up in the frontend client side Javascript
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => { //Parsing the response which comes back in a JSON format
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                let img = document.createElement('img');    // Create an <img> element.
                img.src = data.icon;
                img.setAttribute('style', 'width: 150px; border: 2px solid black');
                messageThree.appendChild(img);
            }
        })
    })
})