const openWeatherMapApiKey = "e0f99c494c2ce394a18cc2fd3f100543";
        let defaultCity = "Peshawar";

        
        function fetchWeeklyForecast(city) {
        
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherMapApiKey}&units=metric`)
                .then(function (response) {
                  
                    // console.log("Forecast Data:", response.data);
                    
                    const dailyForecasts = response.data.list.filter((item, index) => index % 8 === 0);
     
                    renderForecast(dailyForecasts);
                  
                    document.getElementById("city-name").textContent = `Weekly Weather Forecast for ${city}`;
                })
                .catch(function (error) {
                    // Handle error
                    // console.error("Error fetching forecast data:", error);
                    // Display error message
                    document.getElementById("weather-container").textContent = "Error fetching forecast data. Please try again.";
                });
        }

        
        function renderForecast(forecasts) {
            let weatherContainer = document.getElementById("weather-container");
      
            weatherContainer.innerHTML = "";
        
            forecasts.forEach(forecast => {
                let date = new Date(forecast.dt * 1000);
                let iconCode = forecast.weather[0].icon; 
                let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`; 
                let temperature = forecast.main.temp.toFixed(1); 
                let description = forecast.weather[0].description; 

           
                let weatherCard = document.createElement("div");
                weatherCard.classList.add("weather-card");
                weatherCard.innerHTML = `
                    <img src="${iconUrl}" alt="${description}" class="weather-icon">
                    <p>${date.toDateString()}</p>
                    <p>${description}</p>
                    <p>${temperature}°C</p>
                `;
               
                weatherContainer.appendChild(weatherCard);
            });
        }

        
        function searchWeather() {
            let city = document.getElementById("city-input").value.trim();
            if (city) {
                fetchWeeklyForecast(city);
            } else {
                alert("Please enter a city name.");
            }
        }

       
        fetchWeeklyForecast(defaultCity);
        document.getElementById("current-year").textContent = new Date().getFullYear();
    