import axios from 'axios'
export function getRimfire() {
  return axios.get(BASE_API_URL + 'rimfire')
    .then(res => res.data);
}

export function getCenterfire() {
  return axios.get(BASE_API_URL + 'centerfire')
    .then(res => res.data);
}

export function getShotgun() {
  return axios.get(BASE_API_URL + 'shotgun')
    .then(res => res.data);
}

export function getDank() {
  return axios.get(BASE_API_URL + 'dank')
    .then(res => res.data);
}

export function getMainPrices() {
  return axios.get(BASE_API_URL + 'price-ranges')
    .then(res => res.data);
}