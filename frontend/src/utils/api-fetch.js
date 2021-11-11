import {API_BASE} from "./paths"

export async function apiPost(relativePath, jsonPayload = undefined) {
  return fetch(API_BASE + relativePath, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    credentials: "include",  // this field is needed so that browser will send/store cookies
    method: "POST",
    body: JSON.stringify(jsonPayload)
  })
}

export async function apiGet(relativePath) {
  return fetch(API_BASE + relativePath, {
    headers: {
        'Accept': 'application/json',
    },
    credentials: "include",  // this field is needed so that browser will send/store cookies
    method: "GET"
  })
}
