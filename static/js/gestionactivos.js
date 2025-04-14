const imagenesBackend = [
  "../static/img/bkend1.png", "../static/img/db1.png", "../static/img/frend1.png",
  "../static/img/sis1.png", "../static/img/db3.png", "../static/img/pstman1.png",
  "../static/img/pstman2.png", "../static/img/pstman3.png", "../static/img/sis2.png",
  "../static/img/codigo.png", "../static/img/codigo.png", "../static/img/codigo.png"
];

const galeriaEstado = {
  backend: { pagina: 0, imagenes: imagenesBackend, porPagina: 6 }
};

let imagenesLightbox = [];
let imagenActualIndex = 0;

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
    img.onclick = () => abrirLightbox(src, seccion);
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


function abrirLightbox(src, seccion) {
  imagenesLightbox = galeriaEstado[seccion].imagenes;
  imagenActualIndex = imagenesLightbox.indexOf(src);
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "block";

  mostrarImagenLightbox(); 
}


function cerrarLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function siguienteImagen() {
  if (imagenActualIndex < imagenesLightbox.length - 1) {
    imagenActualIndex++;
    mostrarImagenLightbox();
  }
}

function anteriorImagen() {
  if (imagenActualIndex > 0) {
    imagenActualIndex--;
    mostrarImagenLightbox();
  }
}

function mostrarImagenLightbox() {
  const imagen = document.getElementById("lightbox-imagen");
  imagen.src = imagenesLightbox[imagenActualIndex];
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") cerrarLightbox();
  if (e.key === "ArrowRight") siguienteImagen();
  if (e.key === "ArrowLeft") anteriorImagen();
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0); 
  renderGaleria("backend");
});
