// create variables for zipcode, modalError, and view
let state = {
	zipcode: [],
	modalError: `The weather information is currently unavailable, please try again later.`,
	view: 0,
    
};  



// connect to DOM to retrieve the input value for the zipcode from end-user
document.getElementById('zipInput').onchange = function (e) {
	zipcode = e.target.value;
	if (zipcode.length === 5 && isNaN(zipcode) === false) {
		state.zipcode.push(zipcode);
		console.log('good zip');
        return true;
	} else {
		// display modal
		console.log('bad zip');
	}
};

// create the axios call function to API
async function getWeather() {

	try {
		let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${state.zipcode},us&appid=5e8e7816fa1d045c67283a38b2a5b5a6`);
        updateView(resp)
		console.log(resp);
	} catch (err) {
		// display modal error message
		console.log(err);
	}
}



// create the function to control the state
const updateState = function () {
    view++;
}

// create the function to control the view
const updateView = function (resp) {

    let temperature = resp.main.temp;
    let fahrenheit = Math.round((celsius * 1.8) + 32)
    let celsius = Math.round(temperature - 273);
    let city = resp.name;
    let weather = resp.weather[0].description;
    let weatherIcon = resp.weather[0].icon;

    switch (view) {

        case 0:
            appTitle.style.visibility = 'visible';
            zipInput.style.visibility = 'visible';
            getWeather.style.visibility = 'visible';
            break;
        case 1:
            appCity.style.visibility = 'visible'
    }
}
