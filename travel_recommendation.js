const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('searchResult');
const inpDestination = document.getElementById('destinationInput');

function searchDestination() {
    const destinationRequest = inpDestination.value.toLowerCase();

    fetch("./travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            var destinationData = getDestinations(data, destinationRequest);
            if (destinationData) {
                resultDiv.innerHTML = "";
                for (const dest of destinationData) {
                    resultDiv.innerHTML += `
                    <img src="${dest.imageUrl}">
                    <h2>${dest.name}</h2>
                    <p>${dest.description}</p>
                    <button id="${dest.name}">Visit</button>
                    `;
                }    
            } else {
                resultDiv.innerHTML = "Destination not found";
            }
        })
        .catch(error => {
            console.log("Error:", error);
            resultDiv.innerHTML = "An error occurred while fetching data";
        })
}

function getDestinations(data, destinationRequest) {
    const availableCountries = data.countries.map(country => country.name.toLowerCase());
    if (availableCountries.includes(destinationRequest)) {
        return data.countries.find(country => country.name.toLowerCase() === destinationRequest).cities;
    } else if (destinationRequest.startsWith("templ")) {
        return data.temples;
    } else if (destinationRequest.startsWith("beach")) {
        return data.beaches;
    }
}

function clearSearchResults() {
    inpDestination.value = "";
    resultDiv.innerHTML = "";
}

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', clearSearchResults);
