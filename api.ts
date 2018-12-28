import axios from 'axios'

declare const BASE_API_URL: string

import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: BASE_API_URL + 'graphql',
})

export function getRimfire() {
  return client.query({
    query: gql`
      {
        ammoListings(type: rimfire) {
          page
          pages
        }
      }
    `,
  })

  //return axios.get(BASE_API_URL + 'rimfire')
  //   .then(res => res.data);
}

export function getCenterfire() {
  return axios.get(BASE_API_URL + 'centerfire').then(res => res.data)
}

export function getShotgun() {
  return axios.get(BASE_API_URL + 'shotgun').then(res => res.data)
}

export function getDank() {
  return axios.get(BASE_API_URL + 'dank').then(res => res.data)
}

export function getBestPopularPrices() {
  return axios.get(BASE_API_URL + 'best-popular-prices').then(res => res.data)
}
