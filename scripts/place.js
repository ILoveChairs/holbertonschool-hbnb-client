
/**
 * This scripts contains the functionality to fetch pps
 */

let reviewNum = 0;

/* Individually creates a detailed place card */
async function createDetailedPlaceCard(place, father, placeName) {
  const mainDiv = document.createElement('div');

  const hostDiv = document.createElement('div');
  const priceDiv = document.createElement('div');
  const locationDiv = document.createElement('div');
  const nOfRoomsDiv = document.createElement('div');
  const nOfBathroomsDiv = document.createElement('div');
  const coordinatesDiv = document.createElement('div');
  const amenitiesListDiv = document.createElement('div');

  const host = document.createElement('p');
  const price = document.createElement('p');
  const location = document.createElement('p');
  const maxGuests = document.createElement('p');
  const latitude = document.createElement('p');
  const longitude = document.createElement('p');
  const amenitiesLabel = document.createElement('p');
  const amenitiesList = document.createElement('ul');

  // Name node text assignment
  placeName.innerHTML = place.description;

  // Normal text assignment
  host.innerHTML = place.host_name;
  price.innerHTML = `Price per night: \$${place.price_per_night}`;
  location.innerHTML = `Location: ${place.city_name}, ${place.country_name}`;
  maxGuests.innerHTML = `Max Guests: ${place.max_guests}`;
  latitude.innerHTML = `Latitude: ${place.latitude}`;
  longitude.innerHTML = `Longitude: ${place.longitude}`;
  amenitiesLabel.innerHTML = 'What this place offers';

  // Number of Rooms
  const nOfRoomsImage = document.createElement('img');
  const nOfRoomsText = document.createElement('p');
  nOfRoomsImage.src = 'images/bed.png';
  nOfRoomsText.innerHTML = `Number of Rooms: ${place.number_of_rooms}`;
  nOfRoomsDiv.appendChild(nOfRoomsImage);
  nOfRoomsDiv.appendChild(nOfRoomsText);

  // Number of Bathrooms
  const nOfBathroomsImage = document.createElement('img');
  const nOfBathroomsText = document.createElement('p');
  nOfBathroomsImage.src = 'images/bath.png';
  nOfBathroomsText.innerHTML = `Number of Bathooms: ${place.number_of_bathrooms}`;
  nOfBathroomsDiv.appendChild(nOfBathroomsImage);
  nOfBathroomsDiv.appendChild(nOfBathroomsText);

  // Ids and classes
  mainDiv.id = place.id;
  nOfRoomsDiv.id = 'num-of-rooms';
  nOfRoomsDiv.classList.add('num-of');
  nOfBathroomsDiv.id = 'num-of-bathrooms';
  nOfBathroomsDiv.classList.add('num-of');

  // Populates amenitiesList
  for (const amenity of place.amenities) {
    const amenityNode = document.createElement('li');
    const amenityDiv = document.createElement('div');
    const amenityImageDiv = document.createElement('div');
    const amenityTextDiv = document.createElement('div');
    const amenityImage = document.createElement('img');
    const amenityText = document.createElement('p');

    amenityImage.src = `images/amenities/${amenity}.png`;
    amenityImage.onerror = () => {
      amenityImage.onerror = null;
      amenityImage.src = './images/amenities/default.png';
    };
    amenityText.innerHTML = amenity;

    amenityImageDiv.appendChild(amenityImage);
    amenityTextDiv.appendChild(amenityText);

    amenityDiv.appendChild(amenityImageDiv);
    amenityDiv.appendChild(amenityTextDiv);
    amenityDiv.classList.add('amenity-div');

    amenityNode.appendChild(amenityDiv);
    amenitiesList.appendChild(amenityNode);
  }

  hostDiv.appendChild(host);
  priceDiv.appendChild(price);
  locationDiv.appendChild(location);
  coordinatesDiv.appendChild(latitude);
  coordinatesDiv.appendChild(longitude);
  amenitiesListDiv.appendChild(amenitiesLabel);
  amenitiesListDiv.appendChild(amenitiesList);

  mainDiv.appendChild(hostDiv);
  mainDiv.appendChild(priceDiv);
  mainDiv.appendChild(locationDiv);
  mainDiv.appendChild(nOfRoomsDiv);
  mainDiv.appendChild(nOfBathroomsDiv);
  mainDiv.appendChild(coordinatesDiv);
  mainDiv.appendChild(amenitiesListDiv);

  father.appendChild(mainDiv);
}

/* Individually creates a review card */
async function createReviewCard(review, father) {
  const div = document.createElement('div');
  const article = document.createElement('article');

  const userName = document.createElement('p');
  const rating = document.createElement('p');
  const comment = document.createElement('p');

  userName.innerHTML = review.user_name;
  comment.innerHTML = review.comment;

  // Rating stars
  for (let i = 0; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList = ['fa', 'fa-star', 'review-rating']
    if (i <= review.rating) {
      star.classList = ['fa', 'fa-star', 'checked', 'review-rating']
    }
    rating.appendChild(star);
  }

  userName.classList = ['review-username']
  comment.classList = ['review-comment']

  // reviewNum global var
  div.id = reviewNum;
  reviewNum += 1;
  article.classList = ['reviews'];

  article.appendChild(userName);
  article.appendChild(rating);
  article.appendChild(comment);

  div.appendChild(article);
  father.appendChild(div);
}

/* Called if place id was not specified */
async function unspecifiedPlace(header) {
  header.innerHTML = 'ERROR: Place not set';
}

// Api caller
async function getPlace(placeId, placeName, placeSection, reviewSection) {
  const headers = {Accept: 'application/json', }
  const options = {method: 'GET', headers};
  const token = getJwtToken();
  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }
  fetch(`http://localhost:5000/places/${placeId}`, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createDetailedPlaceCard(data, placeSection, placeName);
      console.log('Entering reviews');
      console.log(data);
      for (const review of data.reviews) {
        console.log('Entering for');
        console.log(review);
        createReviewCard(review, reviewSection);
      }
    })
    .catch((err) => {
      console.log(err.toString());
    });
}

window.onload = () => {
  // Load all shared functions that need onload from !shared.js
  loadSharedFunctions()

  const addReview = document.getElementById('add-review');
  const placeName = document.getElementById('place-name');
  const placeSection = document.getElementById('place-details');
  const reviewSection = document.getElementById('reviews');

  // If not logged in, hide add review form and text
  if (!checkJwtToken()) {
    addReview.style = 'visibility: hidden';
  }

  // Grabs place id
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = urlParams.get('id');

  // If not set show unspecifiedPlace
  if (placeId === null) {
    unspecifiedPlace(placeName);
  } else {
    // Calls api to get details of place
    getPlace(placeId, placeName, placeSection, reviewSection);
  }
};
