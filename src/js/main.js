const body = document.getElementById('body')
const footer = document.getElementById('footer')

const contenedorNav = document.getElementById('contenedor-nav')
const iconoNav = document.getElementById('icono-nav')
const main = document.getElementById('main')
const titulo = document.getElementById('titulo')
const cargo = document.getElementById('cargo')

const pantallaDeCarga = document.getElementById('pantalla-de-carga')

//HEADER/////////////////////////////////////////////////
function alternarBlur(valor) {
  if (valor == 'alternar') {
    main.classList.toggle('blur')
    footer.classList.toggle('blur')
  } else {
    if (valor) {
      main.classList.add('blur')
      footer.classList.add('blur')
    } else {
      main.classList.remove('blur')
      footer.classList.remove('blur')
    }
  }
}

iconoNav.addEventListener('click', () => {
  contenedorNav.classList.toggle('nav__caja--visible')
  alternarBlur('alternar')
})

/* para que al sellecionar una seccion del nav, se quite el blur y se esconda la caja de items */

const itemNavTotal = document.querySelectorAll('.item-nav')

itemNavTotal.forEach((item) => {
  item.addEventListener('click', () => {
    alternarBlur(false)

    contenedorNav.classList.toggle('nav__caja--visible')
  })
})

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//ANIMACION DE LA SECCION1 - PRESENTACION ///////////////////////////////////////////

function animar() {
  titulo.classList.add('titulo--animada')

  setTimeout(() => {
    cargo.classList.add('cargo--animada')
  }, 2000)

  setTimeout(() => {
    titulo.classList.remove('titulo--animada')
    cargo.classList.remove('cargo--animada')
  }, 7000)
}

animar()

setInterval(() => {
  animar()
}, 8000)

//INTERCALAR BOTON DE DESCARGAR CV Y CONTACT
const botonDescargarCV = document.getElementById('boton-descargar-cv')
const botonContact = document.getElementById('boton-contact')

botonContact.addEventListener('mouseenter', () => {
  botonDescargarCV.classList.add('boton2')
})

botonContact.addEventListener('mouseleave', () => {
  botonDescargarCV.classList.remove('boton2')
})

/* DESCARGAR CV CON EL BOTON */
botonDescargarCV.addEventListener("click", function() {
  // Simular un clic en el enlace para iniciar la descarga automática
  document.getElementById("descargar-cv").click();
});
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//PRIMERA CARGA DE LA PAGINA////////////////////////////////////////////////////////

window.addEventListener('load', () => {
  pantallaDeCarga.style.display = 'none'
  body.classList.remove('over-hidden')
})

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
//SECCION ACTIVO NAV PINTADO////////////////////////////////////////////////////////
const menuLinks = document.querySelectorAll('.nav__caja a[href^="#"]')

////////////////////////////////////////////////////
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id')
      const menuLink = document.querySelector(`.nav__caja a[href="#${id}"]`)

      if (entry.isIntersecting) {
        document.querySelector('.nav__caja a.selected').classList.remove('selected')
        menuLink.classList.add('selected')
      }
    })
  },
  {rootMargin: '-60% 0px -40% 0px'}
)

////////////////////////////////////////////////////
menuLinks.forEach((menuLink) => {
  const hash = menuLink.getAttribute('href')
  const target = document.querySelector(hash)

  if (target) {
    observer.observe(target)
  }
})

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/* SCROLL REVEAL */

// BOTONES DE LA SECCION 1
ScrollReveal().reveal('.caja2', {
  distance: '300px',
  duration: 1000,
  opacity: 0,
  origin: 'bottom'
})

//SKILS

ScrollReveal().reveal('.titulo-skills', {
  distance: '300px',
  duration: 1000,
  origin: 'top',
  delay: 100
})

ScrollReveal().reveal('.caja-skills', {
  distance: '300px',
  duration: 1000,
  origin: 'right',
  delay: 100
})

//PROYECTOS
ScrollReveal().reveal('.titulo-projects', {
  distance: '800px',
  duration: 1000,
  opacity: 0,
  origin: 'left'
})

ScrollReveal().reveal('.proyecto', {
  distance: '200px',
  duration: 1000,
  opacity: 0,
  origin: 'bottom'
})

ScrollReveal().reveal('.titulo-more-projects', {
  duration: 1000,
  opacity: 0,
  scale: 0
})

// CONTACT
ScrollReveal().reveal('.caja-contact', {
  distance: '800px',
  duration: 1000,
  origin: 'left'
})

///////////////////////////////////////////////////////////////////////////
//RENDERIZAR LOS TRABAJOS DINAMICAMENTE CSS////////////////////////////////
///////////////////////////////////////////////////////////////////////////

TRABAJOSFRONTCSSPURO_SASS.forEach((trabajo) => {
  crearTarjetaSass(trabajo)
})

function crearTarjetaSass(trabajo) {
  const contenedor = document.getElementById('contenedor-proyectos-css')
  const template = document.getElementById('template-proyecto-css')
  //////////////////////////////
  const fragmento = document.createDocumentFragment()
  const clon = template.content.cloneNode(true)
  //////////////////////////////
  clon.querySelector('.proyecto').style.backgroundImage = `url(${trabajo.imagen})`
  clon.querySelector('.nombre').textContent = trabajo.nombre
  clon.querySelector('.descripcion').textContent = trabajo.descripcion
  clon.querySelector('.link-websites').href = trabajo.website
  clon.querySelector('.link-github').href = trabajo.github
  //////////////////////////////
  fragmento.append(clon)
  contenedor.prepend(fragmento)
}

///////////////////////////////////////////////////////////////////////////
//RENDERIZAR LOS TRABAJOS DINAMICAMENTE PHP////////////////////////////////
///////////////////////////////////////////////////////////////////////////

TRABAJOSBACKPHP.forEach((trabajo) => {
  crearTarjetaPhp(trabajo)
})

function crearTarjetaPhp(trabajo) {
  const contenedor = document.getElementById('contenedor-proyectos-php')
  const template = document.getElementById('template-proyecto-php')
  //////////////////////////////
  const fragmento = document.createDocumentFragment()
  const clon = template.content.cloneNode(true)
  //////////////////////////////
  clon.querySelector('.proyecto').style.backgroundImage = `url(${trabajo.imagen})`
  clon.querySelector('.nombre').textContent = trabajo.nombre
  clon.querySelector('.descripcion').textContent = trabajo.descripcion
  clon.querySelector('.link-websites').href = trabajo.website
  clon.querySelector('.link-github').href = trabajo.github
  //////////////////////////////
  fragmento.append(clon)
  contenedor.prepend(fragmento)
}

///////////////////////////////////////////////////////////////////////////
//RENDERIZAR LOS TRABAJOS DINAMICAMENTE REACT////////////////////////////////
///////////////////////////////////////////////////////////////////////////

TRABAJOSREACT.forEach((trabajo) => {
  crearTarjetaReact(trabajo)
})

function crearTarjetaReact(trabajo) {
  const contenedor = document.getElementById('contenedor-proyectos-react')
  const template = document.getElementById('template-proyecto-react')
  //////////////////////////////
  const fragmento = document.createDocumentFragment()
  const clon = template.content.cloneNode(true)
  //////////////////////////////
  clon.querySelector('.proyecto').style.backgroundImage = `url(${trabajo.imagen})`
  clon.querySelector('.nombre').textContent = trabajo.nombre
  clon.querySelector('.descripcion').textContent = trabajo.descripcion
  clon.querySelector('.link-websites').href = trabajo.website
  clon.querySelector('.link-github').href = trabajo.github
  //////////////////////////////
  fragmento.append(clon)
  contenedor.prepend(fragmento)
}

