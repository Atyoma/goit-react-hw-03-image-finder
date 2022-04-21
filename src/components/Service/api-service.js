function fetchPicture(BASE_URL, picture, page, per_page, KEY) {
  return fetch(
    `${BASE_URL}?q=${picture}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    Promise.reject(new Error('Something went wrong!!!'));
  });
}

const api = {
  fetchPicture,
};

export default api;
