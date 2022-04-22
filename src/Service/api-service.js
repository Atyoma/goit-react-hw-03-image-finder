function fetchPicture(picture, page, per_page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '25171903-77720667295a00af61497589c';
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
