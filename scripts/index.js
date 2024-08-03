
/* The idea is to do a fetch of all places and filter them via the client
with the country filter selector. */

const placesList = [];

/* Individually creates a place card */
async function createCard(place, father) {
  const div = document.createElement('div');
  const article = document.createElement('article');
  const name = document.createElement('h2');
  const price = document.createElement('p');
  const location = document.createElement('p');
  const viewDetails = document.createElement('a');

  name.innerHTML = place.description;
  price.innerHTML = `Price per night: \$${place.price_per_night}`;
  location.innerHTML = `Location: ${place.city_name}, ${place.country_name}`;
  viewDetails.innerHTML = 'View Details';

  div.id = place.id;
  article.classList = ['places']
  viewDetails.href = `place.html?id=${place.id}`;

  article.appendChild(name);
  article.appendChild(price);
  article.appendChild(location);
  article.appendChild(viewDetails);

  div.appendChild(article)
  father.appendChild(div);
}

/* Creates all place cards calling createCard */
function createPlaces(places) {
  const father = document.getElementById('places-list');
  for (const place of places) {
    createCard(place, father);
  }
}

/* Hide and unhide filtered cards */
function filterPlaces(filteredPlaces) {
  const placesElement = document.getElementById('places-list');
  const children = placesElement.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    console.log(child)
    if (filteredPlaces.map((place) => place.id).includes(child.id)) {
      child.style.display = 'block';
    } else {
      child.style.display = 'none';
    }
  }
}

/* Manages the filters and then calls createPlaces */
function displayPlaces(places=placesList, countryFilter='0') {
  if (countryFilter === '0') {
    createPlaces(places);
    return;
  }
  selection = places.filter((place) => {
    return place.country_code === countryFilter;
  });
  filterPlaces(selection);
}

/* Does the fetch and calls displayPlaces */
function fetchPlaces() {
  const headers = {Accept: 'application/json', }
  const options = {method: 'GET', mode: 'cors', headers};
  const token = getJwtToken();
  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }
  fetch('http://localhost:5000/places', options)
    .then((response) => {
      return response.json();
    })
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
      //console.log(err.toString());
      throw err;
    });
}

window.onload = () => {
  // Load all shared functions that need onload from !shared.js
  loadSharedFunctions()

  const countryFilter = document.getElementById('country-filter');

  // When filter is changed apply filter calling display with filter as arg.
  countryFilter.onchange = () => {
    displayPlaces(placesList, countryFilter.value);
  };

  // Populate filter
  populateCountryFilter(countryFilter);

  // Call api to fetch places
  fetchPlaces();

};
