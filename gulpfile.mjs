import gulp from "gulp";
const { src, dest, watch, series, parallel } = gulp;

// CSS y SASS
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
const sass = gulpSass(dartSass);
import sourcemaps from "gulp-sourcemaps";
import cssnano from "cssnano";
// Dependencias de imágenes.
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
// gulp-avif se importa de forma diferida (ver versionAvif): depende del
// binario nativo de sharp, que no siempre está disponible en el entorno
// de build de Netlify, y no forma parte del build de producción.

function css(done) {
  // Compilar SASS.
  // Pasos: 1.- Identificar archivo. 2.- Compilarlo. 3.- Guardarlo.
  src("src/scss/style.scss")
    .pipe(sourcemaps.init()) //Inicia el sourcemaps.
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write(".")) // Guarda el sourcemaps.
    .pipe(dest("build/css"));

  done();
}

function js(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));
  done();
}

function imagenes() {
  return src("src/assets/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
}

function versionWebp() {
  const opciones = {
    quality: 50,
  };
  return src("src/assets/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
}

async function versionAvif() {
  const { default: avif } = await import("gulp-avif");
  const opciones = {
    quality: 50,
  };
  return new Promise((resolve, reject) => {
    src("src/assets/**/*.{png,jpg}")
      .pipe(avif(opciones))
      .pipe(dest("build/img"))
      .on("end", resolve)
      .on("error", reject);
  });
}

function dev() {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", js);
  watch("src/assets/**/*", imagenes);
}

const build = series(imagenes, versionWebp, css, js);

// ci corre en Netlify: solo css/js, ambos JS puro sin binarios nativos.
// imagenes/versionWebp/versionAvif dependen de binarios (optipng, cwebp,
// sharp) que fallan en el entorno Linux/pnpm de Netlify — se corren
// localmente y su resultado se commitea, igual que el CV.
const ci = series(css, js);

export {
  css as css,
  js as js,
  dev as dev,
  imagenes as imagenes,
  versionWebp as versionWebp,
  versionAvif as versionAvif,
  build as build,
  ci as ci,
};

export default series(build, dev);

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo
