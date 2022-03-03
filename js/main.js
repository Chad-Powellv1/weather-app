let getWeatherBtn = document.getElementById('getWeather');
let zipcode;
let view = 0;

// create function to valid zip
const zipValidation = function () {
    zipcode = document.getElementById('zipInput').value;

    if (zipcode.length === 5 && isNaN(zipcode) === false) {
		console.log('good zip');
        return true;
           
	} else {
		console.log('bad zip');
	}
};


// create the axios call function to API
async function getWeather() {

	try {
		let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=5e8e7816fa1d045c67283a38b2a5b5a6`);
        let data = resp.data;
		console.log(resp);
	} catch (err) {
		console.log(err);
	}
}

// create event listener to run zip validation and get weather conditionally
getWeatherBtn.addEventListener('click', () => {
    if(zipValidation() === true) {
        getWeather();
    }
});

// create the function to control the state

// create the function to control the view
// const updateView = function (resp) {

//     let temperature = resp.main.temp;
//     let fahrenheit = Math.round((celsius * 1.8) + 32)
//     let celsius = Math.round(temperature - 273);
//     let city = resp.name;
//     let weather = resp.weather[0].description;
//     let weatherIcon = resp.weather[0].icon;

//     switch (view) {

//         case 0:
//             appTitle.style.visibility = 'visible';
//             zipInput.style.visibility = 'visible';
//             getWeatherBtn.style.visibility = 'visible';
//             break;
//         case 1:
//             cityDisplay.style.visibility = 'visible';
//             cityDisplay.textContent = city;
//             temp.style.visibility = 'visible';
//             kelvin.textContent = temperature;
//             fahrenheit.textContent = fahrenheit;
//             celsius.textContent = celsius;
//             currentCondition.style.visibility = 'visible';
//             conditions.textContent = weather;
//             image.innerHTML = weatherIcon;
//             break;

//         case 2:


        

//         }

        
// }
