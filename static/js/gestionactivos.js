const imagenesBackend = [
  "../static/img/1)login.png", "../static/img/2)inicio.png", "../static/img/3)estadisticas.png",
  "../static/img/4)perfil.png", "../static/img/4)usuario-listar.png", "../static/img/41)usuario-crear.png",
  "../static/img/42)usuario-editar.png", "../static/img/5)servidor-listar.png", "../static/img/51)servidor-crear1.png",
  "../static/img/52)servidor-crear2.png", "../static/img/53)servidor-editar1.png", "../static/img/54)servidor-editar2.png",
  "../static/img/6)computador-lista1.png", "../static/img/61)computador-listar2.png", "../static/img/62)computador-crear1.png",
  "../static/img/63)computador-crear2.png", "../static/img/64)computador-editar1.png", "../static/img/65)computador-editar2.png",
  "../static/img/66)dispositivo-listar1.png", "../static/img/67)dispositivo-listar-2.png", "../static/img/68)dispositivo-crear1.png",
  "../static/img/69)dispositivo-crear2.png", "../static/img/70)dispositivo-editar1.png", "../static/img/71)dispositivo-editar2.png",
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
