const API_KEY = '30924994-a957df5e0c4e2063d1e50072c';
const fetchPixbay = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(responce => {
    if (responce.ok) {
      return responce.json();
    }
    return Promise.reject(new Error(`No images`));
  });
};

export default { fetchPixbay };
