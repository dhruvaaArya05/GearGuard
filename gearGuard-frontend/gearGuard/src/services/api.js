const API = "http://localhost:4000/api";

export const getEquipment = () => {
  fetch('http://localhost:4000/api/equipment').
    then(res => res.json());
};

// export const getEquipment = () =>
//   fetch(`${API}/equipment`).then(res => res.json());

export const getRequests = () =>
  fetch(`${API}/requests`).then(res => res.json());

export const createRequest = (data) =>
  fetch(`${API}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());
