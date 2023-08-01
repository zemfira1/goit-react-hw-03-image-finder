import axios from 'axios';
//('https://pixaba.com/api/?q=cat&page=1&key=37286574-30155cd3485a28d99427e1cdf&image_type=photo&orientation=horizontal&per_page=12');

axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '37286574-30155cd3485a28d99427e1cdf';

export async function getPhoto(query, page) {
  const { data } = await axios('api/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    },
  });
  return data;
}
