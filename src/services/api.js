// generic get method
export function get(model) {
  return fetch(`https://api.unsplash.com/${model}?client_id=2306f9180e09b638262f2d11219c723594c35f2b536225cda0bf3324960d2291`)
    .then((res) => res.json());
}

// calling generic get method with corresponding argument
export function getAllPicturesCurated() {
  return get('photos/curated');
}

// calling generic get method with corresponding argument containing username provided by PicturesContainer
export function getAllUsersPhotos(username) {
  return get(`users/${username}/photos`);
}

// calling generic get method with corresponding argument containing pictureId provided by PicturesContainer
export function getPictureStatistics(pictureId) {
  return get(`photos/${pictureId}/statistics`);
}
