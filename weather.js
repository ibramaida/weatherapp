
const key = config.key;

class Forecast {

  constructor(){
    this.key = key;
    this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.locationURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
  }

  async getCityInfo(city) {

    const query = `?apikey=${this.key}&q=${city}`;
    
    let response = await fetch(this.cityURL + query);
    let data = await response.json();

    return data[0];
  }

  async getWeather(locationKey) {

    const query = `${locationKey}?apikey=${this.key}`

    let response = await fetch(this.locationURL + query);
    let data = await response.json();

    return data[0];
  }

}



