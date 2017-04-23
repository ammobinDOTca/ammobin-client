import axios from 'axios'
export function getRimfire() {
  return axios.get(BASE_API_URL + 'rimfire')
    .then(res => res.data);
}