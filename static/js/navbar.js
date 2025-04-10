document.addEventListener("DOMContentLoaded", () => {
    fetch("partials/navbar.html") 
      .then(response => response.text())
      .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
      })
      .catch(err => console.error("Error al cargar navbar:", err));
  });
  