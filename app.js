window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let cityLocation = document.querySelector(".city-location");
  let degreeSection = document.querySelector(".degree-section");
  const degreeSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(position);
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8bdce37bbd19b5288c5b4084a07155e5`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temp = parseFloat(data.main.temp) - 273.15;
          const feels_like = parseFloat(data.main.feels_like) - 273.15;
          const summary = data.weather[0].description;
          const city = data.name;
          const iconid = data.weather[0].icon;

          //set DOM elements from the API
          temperatureDegree.textContent = temp.toFixed(2) + " °C";
          temperatureDescription.textContent = summary;
          cityLocation.textContent = city;
          // formula for farenheight
          let farenheight = (temp * 9) / 5 + 32;
          // sorting the icon
          let img = document.createElement("img");
          img.src = `http://openweathermap.org/img/wn/${iconid}@2x.png`;
          document.getElementById("imagetest").appendChild(img);
          //changing temp to farenheight
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "Real temperature:") {
              degreeSpan.textContent = "Feels like:";
              temperatureDegree.textContent = feels_like.toFixed(2) + " °C";
            } else {
              degreeSpan.textContent = "Real temperature:";
              temperatureDegree.textContent = temp.toFixed(2) + " °C";
            }
          });
        });
    });
  }
  //else {
  // h1.textContent = "Hello, you need to allow location!";
  //}
});
