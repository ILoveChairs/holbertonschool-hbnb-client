
/* The idea is to do a fetch of all places and filter them via the client
with the country filter selector. */

const placesList = [];

/* Individually creates a card */
async function createCard(place, father) {
  const article = document.createElement('article');
  const name = document.createElement('h2');
  const price = document.createElement('p');
  const location = document.createElement('p');
  const viewDetails = document.createElement('a');

  name.innerHTML = place.description;
  price.innerHTML = `Price per night: \$${place.price_per_night}`;
  location.innerHTML = `Location: ${place.city_name}, ${place.country_name}`;
  viewDetails.innerHTML = 'View Details';

  viewDetails.href = `http://localhost:5000/places/${place.id}`;

  article.appendChild(name);
  article.appendChild(price);
  article.appendChild(location);
  article.appendChild(viewDetails);

  father.appendChild(article);
}

/* Creates all place cards calling createCard */
function createPlaces(places) {
  const father = document.getElementById('places-list');
  for (const place of places) {
    createCard(place, father);
  }
}

/* Manages the filters and then calls createPlaces */
function displayPlaces(places=placesList, countryFilter='0') {
  const selection = [];

  if (countryFilter === '0') {
    selection = places;
  } else {
    selection = places.filter((place) => {
      place.country_code === countryFilter;
    });
  }
  createPlaces(selection);
}

/* Does the fetch and calls displayPlaces */
function fetchPlaces() {
  const headers = {}
  const options = {headers};
  const token = getJwtToken();
  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }
  fetch('https://localhost:5000/places', options)
    .then((response) => response.json())
    .then((data) => {
      // Clears array
      placesList.length = 0;
      // Fills it with data from server
      for (const place of data) {
        placesList.push(place);
      }
      // Calls the function to display cards.
      displayPlaces(placesList);
    })
    .catch((err) => {
      console.log(err.toString());
    });
}

window.onload = () => {
  // Load all shared functions that need onload from !shared.js
  loadSharedFunctions()

  // When filter is changed apply filter calling display with filter as arg.
  const countryFilter = document.getElementById('country-filter');
  countryFilter.addEventListener('change', () => {
    displayPlaces(placesList, countryFilter.value);
  });

  // Call appi to fetch places
  fetchPlaces();

};
