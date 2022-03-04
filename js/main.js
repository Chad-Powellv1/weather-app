// event listeners
let getWeatherBtn = document.getElementById('getWeather');
document.getElementById('appTitle').style = appTitle;
document.getElementById('zipInput').style = zipInput;
let cityDisplay = document.getElementById('cityDisplay');
let temp = document.getElementById('temp');
let kelvin = document.getElementById('kelvin');
let fahrenheitText = document.getElementById('fahrenheit');
let celsiusText = document.getElementById('celsius');
let currentCondition = document.getElementById('currentCondition');
let conditions = document.getElementById('conditions');
let imageIcon = document.getElementById('image');
let modalError = new bootstrap.Modal(document.getElementById('modalError'), {
	keyboard: false
  })
let zipcode;

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
		let resp = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=5e8e7816fa1d045c67283a38b2a5b5a6`
		);
		let data = await resp.data;
		updateState(data);
		console.log(resp);
	} catch (err) {
		modalError.show();
		console.log(err);
		
	}
}

// function allowing end-user to close modal with 'X' inside modal
let closeModal = () => modalError.hide();
// modalExit.addEventListener('click', closeModal);
	

// function allowing end-user to close modal with 'Esc' key press
window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		closeModal();
	}
});

// create event listener to run zip validation and get weather conditionally
getWeatherBtn.addEventListener('click', () => {
	if (zipValidation() === true) {
		getWeather();
	}
});

// create a function to control state
const updateState = function (data) {

	// data variables
	let temperature = Math.round(data.main.temp);
	let celsius = Math.round(temperature - 273);
	let fahrenheit = Math.round(celsius * 1.8 + 32);
	let city = data.name;
	let weather = data.weather[0].description;
	let icon = data.weather[0].icon;
	let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`

	// default view
	appTitle.display = 'block';
	zipInput.display = 'block';
	getWeatherBtn.style.display = 'block';

	// weather display
	cityDisplay.style.display = 'block';
	cityDisplay.textContent = city;
	temp.style.display = 'block';
	kelvin.textContent = `${temperature} °K`;
	fahrenheitText.textContent = `${fahrenheit} ℉`;
	celsiusText.textContent = `${celsius} ℃`;
	currentCondition.style.display = 'block';
	conditions.textContent = weather;
	imageIcon.innerHTML = `<img src ="${iconUrl}" />`;

};

document.getElementById('zipInput').addEventListener('click', () => {
    zipInput.value = '';
	cityDisplay.style.display = 'none';
	cityDisplay.textContent = '';
	temp.style.display = 'none';
	kelvin.textContent = '';
	fahrenheitText.textContent = '';
	celsiusText.textContent = '';
	currentCondition.style.display = 'none';
	conditions.textContent = '';
	imageIcon.innerHTML = '';
});
