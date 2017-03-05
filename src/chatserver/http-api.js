import fetch from 'isomorphic-fetch'
// import { polyfill } from 'es6-promise'

/*
session-based api communication
Headers must have a JWT token for authentication,
token is stored in localStorage upon signin
*/

// api calls to phoenix
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let buildHeaders = () => {
  const authToken = localStorage.getItem('id_token')

  return new Headers(Object.assign({}, defaultHeaders, {
    Authorization: authToken
  }))
}

let checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export async function httpGet (url) {
  const response = await fetch(url, {
    headers: buildHeaders()
  })

  return checkStatus(response).json()
}

export async function httpPost (url, data) {
  const body = JSON.stringify(data)
  const response = await fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body
  })

  return checkStatus(response).json()
}

export async function httpDelete (url) {
  const response = await fetch(url, {
    method: 'delete',
    headers: buildHeaders()
  })

  return checkStatus(response).json()
}

export async function httpUpdate (url, data) {
  const body = JSON.stringify(data)
  const response = await fetch(url, {
    method: 'put',
    headers: buildHeaders(),
    body: body
  })

  return checkStatus(response).json()
}
