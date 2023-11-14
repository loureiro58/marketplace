import { apiURL } from "./env";

export async function api(url, requestOptions = {}) {
  
  const res = await checkToken();
  const json = await res.json();

  if (res.status === 200) {
    return next(url, requestOptions);    
  }
  else if(json && json.redirect) {
    window.location.href = json.redirect;
    alert(json.mensagem)
    return new Promise();
  }
  else if(res.status === 401) {
    return login();
  }
}
export async function apiWithToken(url, requestOptions = {}) {
    return next(url, requestOptions);    
}

function getHeaders(headers = {}) {
  return new Headers({
    ...headers,
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
}

async function checkToken() {
  const requestOptions = {
    method: 'POST',
    headers: getHeaders()
  };
  const res = await fetch(apiURL + 'me', requestOptions);
  return res;
}

export function login() {
  alert('Sessão expirada! Faça o login novamente.');
  localStorage.removeItem('token');
  localStorage.removeItem('permissions');
  window.location.href = "/";

  return new Promise();
}

function next(url, requestOptions) {
  const headers = requestOptions.headers ?? {}
  return fetch(url, {
    ...requestOptions,
    headers: getHeaders(headers)
  })
}