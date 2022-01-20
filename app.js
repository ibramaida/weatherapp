
const form = document.querySelector('.change-location');
const card = document.querySelector('.card');
const dayNightImg = document.querySelector('.day-night-img');
const details = document.querySelector('.details');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();


const updateUI = (data) => {
  const {cityDetails, weatherDetails} = data;

  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }

  // update details
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weatherDetails.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update day night image
  let dayNightSrc = weatherDetails.IsDayTime? 'img/day.svg' : 'img/night.svg';
  dayNightImg.setAttribute('src', dayNightSrc);

  // update icon
  let iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
};

const updateCity = async (city) => {
  const cityDetails = await forecast.getCityInfo(city);
  const weatherDetails = await forecast.getWeather(cityDetails.Key);
  return {cityDetails, weatherDetails}
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = form.city.value.trim();

  localStorage.setItem('city', city);

  updateCity(city)
    .then(data => {
      updateUI(data);
      // console.log(data);
    })
    .catch(err => console.log(err));

  });
  
  if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  };


 


