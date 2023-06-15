/*fetch() takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that ////resolves with a Response object.
The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.*/

let weather = {
  apiKey: "6effee45750ab5d6352883fff30e9166",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const unix_sunrise = data.sys.sunrise;
    const unix_sunset = data.sys.sunset;
    const country = data.sys.country;

    //************sunrise and sunset time calculation

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var rdate = new Date(unix_sunrise * 1000);
    // Hours part from the timestamp
    var hours = rdate.getHours();
    // // Minutes part from the timestamp
    var minutes = rdate.getMinutes();
    // // Seconds part from the timestamp
    var seconds = rdate.getSeconds();
    // // Will display time in 10:30:23 format
    var formattedSunrise = hours + ":" + minutes + ":" + seconds;

    // console.log(formattedSunrise);

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var sdate = new Date(unix_sunset * 1000);
    // Hours part from the timestamp
    var hours = sdate.getHours();
    // // Minutes part from the timestamp
    var minutes = sdate.getMinutes();
    // // Seconds part from the timestamp
    var seconds = sdate.getSeconds();
    // // Will display time in 10:30:23 format
    var formattedSunset = hours + ":" + minutes + ":" + seconds;

    // console.log(formattedSunset);

    //************

    document.querySelector(".city").innerText = name;
    document.querySelector(".country").innerText = ", " + country;
    var currentDate = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = months[currentDate.getMonth()];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[currentDate.getDay()];
    document.querySelector(".month-date").innerText =
      month + " " + currentDate.getDate();
    document.querySelector(".day-time").innerText =
      day + ", " + currentDate.getHours() + ":" + currentDate.getMinutes();
    document.querySelector(".sunrise").innerText =
      "Sunrise: " + formattedSunrise;
    document.querySelector(".sunset").innerText = "Sunset: " + formattedSunset;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".feelslike").innerText =
      "Feels like " + feels_like + "°C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search(); //this gets the value of the search bar and searches for it
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") weather.search();
  });

weather.fetchWeather("Delhi");
