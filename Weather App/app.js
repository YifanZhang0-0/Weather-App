window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.pirateweather.net/forecast/Ra79ZBlPnKig6vGgIN8msBJ1K7zClTGO/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // Formula for Celsius
                let celsius = (temperature - 32) * (5 / 9);
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // Change temp to Celsius/Fahrenheit
                temperatureSection.addEventListener('click',  () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
            });

    } else {
        h1.textContent = "This is not working because you have not enabled your location";
    }

    function setIcons(icon, iconID) {
        const iconMap = {
            'CLEAR_DAY': './icons/day.svg',
            'CLEAR_NIGHT': './icons/night.svg',
            'PARTLY_CLOUDY_DAY': './icons/cloudy-day-1.svg',
            'PARTLY_CLOUDY_NIGHT': './icons/cloudy-night-1.svg',
            'CLOUDY': './icons/cloudy.svg',
            'RAIN': './icons/rainy-5.svg',
            'SNOW': './icons/snowy-7.svg',
        };
    
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        const iconPath = iconMap[currentIcon];
    
        // Clear any existing content in the div
        iconID.innerHTML = '';
    
        if (iconPath) {
            fetch(iconPath)
            .then(response => response.text())
            .then(svg => {
                iconID.innerHTML = svg; // Insert the SVG into the div
            });
        }
    }
    
});