const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const countryInfo = document.getElementById("countryInfo");
const message = document.getElementById("message");


searchBtn.addEventListener("click", getCountry);


countryInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getCountry();
    }
});


async function getCountry() {
    const countryName = countryInput.value.trim();


    if (countryName === "") {
        message.textContent = "Please enter a country name!";
        countryInfo.innerHTML = "";
        return;
    }


    message.textContent = "Loading...";
    countryInfo.innerHTML = "";


    try {
        const response = await fetch(
            "https://countries.dev/name/" + encodeURIComponent(countryName)
        );


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();
       console.log(data)
     
        const countries = Array.isArray(data) ? data : [data];

        const country = countries.find(item =>
            item.name.toLowerCase() === countryName.toLowerCase()
        ) || countries[0];


        if (!country || !country.name) {
            throw new Error("Country not found");
        }


        const currency = country.currencies &&
                         country.currencies.length > 0
            ? country.currencies.map(item =>
                item.name + " (" + (item.symbol || item.code) + ")"
              ).join(", ")
            : "Not available";


        const flag = country.flag;


        countryInfo.innerHTML = `
        <img src="https://flagcdn.com/w320/in.png" alt="Flag of ${country.name}" class="flag">


            <h2>${country.name}</h2>


            <p><strong>Capital:</strong>
                ${country.capital || "Not available"}
            </p>


            <p><strong>Population:</strong>
                ${typeof country.population === "number"
                    ? country.population.toLocaleString()
                    : "Not available"}
            </p>


            <p><strong>Region:</strong>
                ${country.region || "Not available"}
            </p>


            <p><strong>Currency:</strong>
                ${currency}
            </p>
        `;


        message.textContent = "";


    } catch (error) {
        message.textContent =
            "Country not found. Please try another name.";


        countryInfo.innerHTML = "";
    }
}