window.addEventListener('load', () => {
  const temperatureDegree = document.getElementById('temperatureDegree');
  const temperatureDescr = document.getElementById('temperatureDescr');
  const locationTimezone = document.getElementById('locationTimezone');
  const locationIcon = document.getElementById('locationIcon');
  const temperatureHeader = document.getElementById('temperatureHeader');
  const temperatureDigit = document.getElementById('temperatureDigit');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/09ccf512372e7c6c3e1a59fa686b3b57/${lat},${lng}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          const { temperature, summary, icon } = data.currently;
          const timezone = data.timezone;

          // Formula for Celsius
          const celsius = (temperature - 32) * (5 / 9);

          // Set DOM elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescr.textContent = summary;
          locationTimezone.textContent = timezone;

          // Set icon
          setIcon(icon, locationIcon);

          // Chnage temperature to Celsius/Farenheit
          temperatureHeader.addEventListener('click', () => {
            if (temperatureDigit.textContent === 'F') {
              temperatureDigit.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureDigit.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});

function setIcon(icon, iconID) {
  const skycons = new Skycons({ color: 'white' });
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();

  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
