
/**
 * This scripts contains the functionality to fetch pps
 */

let reviewNum = 0;
let currentRating = 5;

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
  host.innerHTML = `<b>Host:</b> ${place.host_name}`;
  price.innerHTML = `<b>Price per night:</b> \$${place.price_per_night}`;
  location.innerHTML = `<b>Location:</b> ${place.city_name}, ${place.country_name}`;
  maxGuests.innerHTML = `<b>Max Guests:</b> ${place.max_guests}`;
  latitude.innerHTML = `<b>Latitude:</b> ${place.latitude}`;
  longitude.innerHTML = `<b>Longitude:</b> ${place.longitude}`;
  amenitiesLabel.innerHTML = '<b>What this place offers:</b>';

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
  mainDiv.classList.add('place');
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

  hostDiv.id = 'host-div';
  priceDiv.id = 'price-div';
  locationDiv.id = 'location-div';
  nOfRoomsDiv.id = 'nofrooms-div';
  nOfBathroomsDiv.id = 'nofbathrooms-div';
  coordinatesDiv.id = 'coordinates-div';
  amenitiesListDiv.id = 'amenities-list-div';

  hostDiv.classList.add('place-details-inside-div');
  priceDiv.classList.add('place-details-inside-div');
  locationDiv.classList.add('place-details-inside-div');
  nOfRoomsDiv.classList.add('place-details-inside-div');
  nOfBathroomsDiv.classList.add('place-details-inside-div');
  coordinatesDiv.classList.add('place-details-inside-div');
  amenitiesListDiv.classList.add('place-details-inside-div');

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

  const userNameDiv = document.createElement('div');
  const ratingDiv = document.createElement('div');
  const commentDiv = document.createElement('div');

  const userName = document.createElement('p');
  const rating = document.createElement('p');
  const comment = document.createElement('p');

  userName.innerHTML = review.user_name;
  comment.innerHTML = review.comment;

  // Rating stars
  for (let i = 5; i > 0; i--) {
    const star = document.createElement('span');
    star.classList = ['star', 'review-rating'];
    if (i <= review.rating) {
      star.classList.add('checked');
    }
    rating.appendChild(star);
  }

  userNameDiv.id = 'review-username';
  ratingDiv.id = 'review-rating';
  commentDiv.id = 'review-comment';
  userNameDiv.classList.add('review-inside-div');
  ratingDiv.classList.add('review-inside-div');
  commentDiv.classList.add('review-inside-div');

  userName.classList.add('review-username');
  comment.classList.add('review-comment');

  // reviewNum global var
  div.id = `review-${reviewNum}`;
  reviewNum += 1;
  article.classList.add('review');

  userNameDiv.appendChild(userName);
  ratingDiv.appendChild(rating);
  commentDiv.appendChild(comment);

  article.appendChild(userNameDiv);
  article.appendChild(ratingDiv);
  article.appendChild(commentDiv);

  div.appendChild(article);
  father.appendChild(div);
}

/* Called if place id was not specified */
async function unspecifiedPlace(header) {
  header.innerHTML = 'ERROR: Place not set';
}

// Sends review
async function sendReview(review, placeId) {
  const rating = currentRating;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify({
       rating,
       review,
      }),
  };
  const token = getJwtToken();
  if (token !== '') {
    headers['Authorization'] = `Bearer ${token}`
  }
  fetch(`http://localhost:5000/places/${placeId}/reviews`, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.hasOwnProperty('msg')) {
        location.reload();
      } else {
        console.log(data);
      }
    })
    .catch((err) => {
      console.log(err.toString());
    });
}

async function updateAddReviewStars(reviewFormStars, rating) {
  currentRating = rating;
  let i = 5;
  for (const star of reviewFormStars.children) {
    star.classList = ['star', 'review-rating'];
    if (i <= rating) {
      star.classList.add('checked');
    }
    reviewFormStars.appendChild(star);
    i -= 1;
  }
}

// Api caller
async function getPlace(placeId, placeName, placeSection, reviewSection) {
  const headers = {Accept: 'application/json'}
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
      for (const review of data.reviews) {
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
  const reviewForm = document.getElementById('review-form');
  const reviewFormStars = document.getElementById('add-review-rating');

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

  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    sendReview(reviewForm.reviewText.value, placeId);
  });

  const star1 = document.getElementById('star-1');
  star1.onclick = () => {updateAddReviewStars(reviewFormStars, 1)}
  const star2 = document.getElementById('star-2');
  star2.onclick = () => {updateAddReviewStars(reviewFormStars, 2)}
  const star3 = document.getElementById('star-3');
  star3.onclick = () => {updateAddReviewStars(reviewFormStars, 3)}
  const star4 = document.getElementById('star-4');
  star4.onclick = () => {updateAddReviewStars(reviewFormStars, 4)}
  const star5 = document.getElementById('star-5');
  star5.onclick = () => {updateAddReviewStars(reviewFormStars, 5)}
};
