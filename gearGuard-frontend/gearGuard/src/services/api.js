const API = "http://localhost:4000/api";

export const getEquipment = () =>
  fetch(`${API}/equipment`).then(res => res.json());

export const getRequests = () =>
  fetch(`${API}/requests`).then(res => res.json());

export const getRequestsByEquipment = (id) =>
  fetch(`${API}/requests/equipment/${id}`).then(res => res.json());

export const createRequest = (data) =>
  fetch(`${API}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const updateRequest = (id, data) =>
  fetch(`${API}/requests/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());



// const API = "http://localhost:4000/api";

// export const getRequests = () => {
//   return fetch(`${API}/requests`)
//     .then(res => res.json());
// };

// export const createRequest = (data) => {
//   return fetch(`${API}/requests`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
// };

// export const updateRequest = (id, data) => {
//   return fetch(`${API}/requests/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
// };


// const API = "http://localhost:4000/api";

// export const getRequests = () => {
//   fetch('http://localhost:4000/api/requests').
//     then(res => res.json());
// };

// export const getEquipment = () =>
//   fetch(`${API}/equipment`).then(res => res.json());

// export const createRequest = (data) => {
//   fetch('http://localhost:4000/api/requests', {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
// }

// export const getRequests = () =>
//   fetch(`${API}/requests`).then(res => res.json());

// export const updateRequest = (id, data) => {
//   fetch(`http://localhost:4000/api/requests/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
// }

// export const createRequest = (data) =>
//   fetch(`${API}/requests`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   }).then(res => res.json());
