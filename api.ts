import axios from 'axios'

declare const BASE_API_URL: string
export function getDank() {
  return axios.get(BASE_API_URL + 'dank').then(res => res.data)
}
