
let reviewNum = 0;

/* Individually creates a detailed place card */
async function createDetailedPlaceCard(place, father) {
  const div = document.createElement('div');
  const article = document.createElement('article');

  const host = document.createElement('p');
  const price = document.createElement('p');
  const location = document.createElement('p');
  const nOfRooms = document.createElement('div');
  const nOfBathrooms = document.createElement('div');
  const maxGuests = document.createElement('p');
  const latitude = document.createElement('p');
  const longitude = document.createElement('p');
  const amenitiesLabel = document.createElement('p');
  const amenitiesList = document.createElement('ul');

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
  nOfRooms.appendChild(nOfRoomsImage);
  nOfRooms.appendChild(nOfRoomsText);

  // Number of Bathrooms
  const nOfBathroomsImage = document.createElement('img');
  const nOfBathroomsText = document.createElement('p');
  nOfBathroomsImage.src = 'images/bath.png';
  nOfBathroomsText.innerHTML = `Number of Rooms: ${place.number_of_bathrooms}`;
  nOfBathrooms.appendChild(nOfBathroomsImage);
  nOfBathrooms.appendChild(nOfBathroomsText);

  // Ids and classes
  div.id = place.id;
  article.classList = ['place'];
  nOfRooms.id = 'num-of-rooms';
  nOfRooms.classList = ['num-of'];
  nOfBathrooms.id = 'num-of-bathrooms';
  nOfBathrooms.classList = ['num-of'];

  // Populates amenitiesList
  for (const amenity of place.amenities) {
    const amenityNode = document.createElement('li');
    const amenityDiv = document.createElement('div');
    const amenityImage = document.createElement('img');
    const amenityText = document.createElement('p');

    amenityImage.src = `images/amenities/${amenity}.png`;
    amenityImage.onerror = () => {
      this.onerror = null;
      this.src = 'default.png';
    };
    amenityText.innerHTML = amenity;

    amenityDiv.appendChild(amenityImage);
    amenityDiv.appendChild(amenityText);

    amenityNode.appendChild(amenityDiv);
    amenitiesList.appendChild(amenityNode);
  }

  article.appendChild(price);
  article.appendChild(location);
  article.appendChild(amenitiesLabel);
  article.appendChild(amenitiesList);

  div.appendChild(article);
  father.appendChild(div);
}

/* Individually creates a review card */
async function createReviewCard(review, father) {
  const div = document.createElement('div');
  const article = document.createElement('article');

  const userName = document.createElement('h2');
  const rating = document.createElement('p');
  const comment = document.createElement('p');

  userName.innerHTML = review.user_name;
  comment.innerHTML = review.comment;

  // Rating stars
  for (let i = 0; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList = ['fa', 'fa-star']
    if (i <= review.rating) {
      star.classList = ['fa', 'fa-star', 'checked']
    }
    rating.appendChild(star);
  }

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

window.onload = () => {
  // Load all shared functions that need onload from !shared.js
  loadSharedFunctions()

  const addReview = document.getElementById('add-review');

  // If not logged in, hide add review form and text
  if (!checkJwtToken()) {
    addReview.style = 'visibility: hidden';
  }
};
