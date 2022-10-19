'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then((response) => response.text())
    .then((fortune) => {
      document.querySelector('#fortune-text').innerHTML = fortune;
    })
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  //?zipcode=55106
  fetch(url + `?zipcode=${zipcode}`)
    .then((response) => response.text())
    .then((weather) => {
      const forecast = JSON.parse(weather)['forecast'];
      document.querySelector('#weather-info').innerHTML = forecast;
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const formInputs = {
    qty : document.querySelector('#qty-field').value,
    melon_type : document.querySelector('#melon-type-field').value
  };

  const orderStatus = document.querySelector('#order-status');

  if (! formInputs['qty'] || Number(formInputs['qty']) < 1){
    orderStatus.setAttribute('class', 'order-error'); //add error css
    if (! formInputs['qty']){
      orderStatus.innerHTML = 'No quantity selected'; //display error stop func
      return;
    }
  }
  else if (orderStatus.getAttribute('class')) {
    orderStatus.removeAttribute('class'); //remove error css if in place
  }
  
  const params = {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    }}
  fetch('/order-melons.json', params)
    .then((response) => response.text())
    .then((responseObj) => {
      const msg = JSON.parse(responseObj)['msg'];
      orderStatus.innerHTML = msg;
    })
  
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


//Further Study: get json response from https://dog.ceo/api/breeds/image/random
//and then display the image from the url in json['message'] 

function getDogImage(){
  const imageDiv = document.querySelector('#dog-image');

  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.text())
    .then((responseJSON) => {
      const dogURL = JSON.parse(responseJSON)['message']; //working to here
      if (! document.querySelector('#dog-pic')){
        imageDiv.insertAdjacentHTML('beforeend', `<img id="dog-pic" src=${dogURL}>`)
      }
        else {
          document.querySelector('#dog-pic').setAttribute('src', dogURL)
        }
    })
}

document.querySelector('#get-dog-image').addEventListener('click', getDogImage)


//$(".breeds-image-random pre").html(JSON.stringify(data, null, 4));
