const API = "http://localhost:5000/api";

// LOAD DATA DASHBOARD
async function loadDashboard() {
  const bikes = await fetch(`${API}/bikes`).then(res => res.json());
  const users = await fetch(`${API}/users`).then(res => res.json());

  document.getElementById("bikeCount").innerText = bikes.length;
  document.getElementById("userCount").innerText = users.length;
}

loadDashboard();