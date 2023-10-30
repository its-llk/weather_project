// JavaScript source code

function fetchdata(url, func) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            func(data);
        })
        .catch(error => console.error(error));

}
function fetchCountries(data) {


    const countrySelect = document.getElementById("countrySelect");
    data.data.forEach(country => {
        const option = document.createElement("option");
        option.value = country.name;
        option.text = country.name;
        countrySelect.appendChild(option);
    });
}

// Function to fetch cities for the selected country from the second API
function fetchCities(data) {

    const citySelect = document.getElementById("citySelect");
    citySelect.innerHTML = "<option value=''>Select a city</option>"; // Clear and reset the city dropdown
    data.data.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.text = city;
        citySelect.appendChild(option);
    });

}

function add_card(data) {

    var container = document.getElementById("maindiv");
    container.innerHTML = "";
    for (var row = 0; row < 8; row++) {
        var rowDiv = document.createElement("div");
        rowDiv.className = "row";
        for (var i = 0; i < 3; i++) {
            const div = document.createElement("div");
            div.className = "inner-div";
            const header = document.createElement("div");
            header.className = "header";
            header.textContent = "+" + data.dataseries[row + i * 8].timepoint;;

            const content = document.createElement("div");

            content.textContent = temp;


            var img = document.createElement("img");
            switch (data.dataseries[row + i * 8].cloudcover) {
                case 1:
                    img.src = "img/sunny.jpg";
                    break;
                case 2:
                    img.src = "img/cloudy.jpg";
                    break;
                case 3:
                    img.src = "img/very_cloudy.jpg";
                case 4:
                    img.src = "img/lil_rainy.jpg";
                    break;
                case 5:
                    img.src = "img/rainy.jpg";
                    break;
                case 6:
                    img.src = "img/snow.jpg";
                    break;
                case 7:
                    img.src = "img/lighty.jpg";
                    break;
                default:
                    img.src = "img/very_lighty.jpg";
            }


            var temp = document.createElement("div");
            temp.className = "temp";
            temp.textContent = data.dataseries[row + i * 8].temp2m;;


            div.appendChild(header);
            div.appendChild(img);
            div.appendChild(temp);
            rowDiv.appendChild(div);
        }
        container.appendChild(rowDiv);
    }


}





function find_weather(data) {


    add_card(data);
    console.log(data.dataseries[0].cloudcover);


}


function find_location(data) {

    const lat = data[0].lat;
    const lon = data[0].lon;
    console.log("lat:" + lat);
    console.log("lon:" + lon);
    fetchdata(`https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`, find_weather);



}


// Event listeners
const countrySelect = document.getElementById("countrySelect");
const citySelect = document.getElementById("citySelect");

countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    if (selectedCountry) {
        fetchdata(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${selectedCountry}`, fetchCities);
        citySelect.value = "";
        citySelect.addEventListener("change", () => {
            const selectedCity = citySelect.value;
            if (selectedCity) {

                fetchdata(`https://nominatim.openstreetmap.org/search.php?city=${selectedCity}&country=${selectedCountry}&format=jsonv2`, find_location);

            } else {
                citySelect.innerHTML = "<option value=''>Choose a country to see its cities</option>";
            }
        });

    } else {
        citySelect.innerHTML = "<option value=''>Choose a country to see its cities</option>";
    }
});

// Fetch the list of countries when the page loads
fetchdata("https://countriesnow.space/api/v0.1/countries/info?returns=flag", fetchCountries);




