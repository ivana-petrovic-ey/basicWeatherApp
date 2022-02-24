$(document).ready(function () {
  var showWeatherButton = $("#weatherButton");
  var input = $("#inputCity");
  var h2 = $("h2");
  var targetCity = $("#city");
  var errorMessage = $("#errorMessage");
  var temperature = $("#temp");
  var description = $("#description");
  var country = $("#country");
  var results = $(".results");
  var humidity = $("#humidity");
  var pressure = $("#pressure");
  var wind = $("#wind");
  var image = $("img");

  // on button Show Weather fire a function to fetch data from server
  showWeatherButton.click(function () {
    var searchCity = input.val().trim();
    var http = new XMLHttpRequest();
    var apiKey = "a528ec267b2491fa8cac3f544e842cb3";
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;
    var method = "GET";

    // AJAX call
    http.open(method, url);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var data = JSON.parse(http.responseText);
        var iconId = data.weather[0].icon;
        var icon = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

        h2.css("visibility", "visible");
        results.css("visibility", "visible");

        targetCity.text(data.name);
        temperature.text(Math.round(data.main.temp));
        humidity.text(data.main.humidity);
        pressure.text(data.main.pressure);
        wind.text(data.wind.speed.toFixed(1));
        description.text(data.weather[0].description);
        country.text(data.sys.country);
        image.attr("src", `${icon}`);
      } else if (http.status !== 200) {
        errorMessage.text = "something went wrong :(";
      }
    };
    http.send();
  });
});
