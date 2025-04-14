const imagenesBackend = [
    "../static/img/inicio1.png", "../static/img/inicio1.png", "../static/img/inicio1.png",
    "../static/img/inicio1.png", "../static/img/inicio1.png", "../static/img/inicio1.png",
    "../static/img/codigo.png", "../static/img/codigo.png", "../static/img/codigo.png",
    "../static/img/codigo.png", "../static/img/codigo.png", "../static/img/codigo.png"
  ];
  
  const galeriaEstado = {
    backend: { pagina: 0, imagenes: imagenesBackend, porPagina: 6 }
  };

  function renderGaleria(seccion) {
    const contenedor = document.getElementById(`galeria-${seccion}`);
    const { pagina, imagenes, porPagina } = galeriaEstado[seccion];
    contenedor.innerHTML = "";
  
    const inicio = pagina * porPagina;
    const fin = inicio + porPagina;
    const imagenesActuales = imagenes.slice(inicio, fin);
  
    imagenesActuales.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Imagen proyecto";
      img.onclick = () => abrirLightbox(src);
      contenedor.appendChild(img);
    });
  }
  
  function cambiarPagina(seccion, direccion) {
    const estado = galeriaEstado[seccion];
    const totalPaginas = Math.ceil(estado.imagenes.length / estado.porPagina);
    estado.pagina += direccion;
    if (estado.pagina < 0) estado.pagina = 0;
    if (estado.pagina >= totalPaginas) estado.pagina = totalPaginas - 1;
    renderGaleria(seccion);
  }
  
  function abrirLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const imagen = document.getElementById("lightbox-imagen");
    imagen.src = src;
    lightbox.style.display = "block";
  }
  
  function cerrarLightbox() {
    document.getElementById("lightbox").style.display = "none";
  }
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarLightbox();
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    renderGaleria("backend");
  });
  