
async function fetchPlaces(token) {
  
}

function displayPlaces(places) {

}

function reloadPlaces() {
  fetch('https://hellosalut.stefanbohacek.dev/')
    .then((response) => response.json())
    .then((data) => {displayPlaces()})
    .catch((err) => {console.log(err.toString())});
}

window.onload = () => {
  loadSharedFunctions()

  countryFilter = document.getElementById('country-filter');
  countryFilter.addEventListener('change', () => {reloadPlaces()});
  reloadPlaces();

};
