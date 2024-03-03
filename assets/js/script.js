// Opciones para el efecto de grano en el fondo
var options = {
    "animate": true, // Permite la animación del grano
    "patternWidth": 354.9, // Ancho del patrón del grano
    "patternHeight": 257.9, // Alto del patrón del grano
    "grainOpacity": 0.16, // Opacidad del grano
    "grainDensity": 1.59, // Densidad del grano
    "grainWidth": 2.29, // Ancho del grano
    "grainHeight": 1 // Alto del grano
};

// Aplicar el efecto de grano al elemento con el id "container"
grained("#container", options);

// Función para animar el gradiente de fondo
function moveBackgroundGradient() {
    var container = document.getElementById('container');
    var angle = 0;

    function updateGradient() {
        angle += 1; // Incrementa el ángulo para la animación del gradiente
        
        // Ajusta el fondo del contenedor con un gradiente lineal y colores con opacidad
        container.style.background = 'linear-gradient(' + angle + 'deg, rgba(78, 5, 86, 0.5), rgba(12, 118, 14, 0.5), rgba(218, 101, 16, 0.5), rgba(19, 218, 16, 0.5), rgba(239, 216, 23, 0.5))';
    }

    // Iniciar la animación del gradiente de fondo
    setInterval(updateGradient, 50); // Ajusta el intervalo de tiempo para controlar la velocidad de movimiento
}

// Llamar a la función para iniciar la animación del gradiente de fondo
moveBackgroundGradient();

// Crear una nueva instancia de Lenis para algunas animaciones específicas
const lenis = new Lenis();

// Función para el ciclo de renderizado utilizando requestAnimationFrame
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

// Iniciar el ciclo de renderizado
requestAnimationFrame(raf);

// Deshabilitar el suavizado de retraso de la animación GSAP
gsap.ticker.lagSmoothing(0);

// Clase principal de la aplicación que controla varias animaciones y efectos
class App {
    constructor(){
        // Seleccionar las imágenes de héroe y los textos
        this.heroImages = [...document.querySelectorAll(".hero__images img")];
        this.texts = [...document.querySelectorAll(".text__effect")];

        // Inicializar la aplicación
        this._initialize();
        // Renderizar la aplicación
        this._render();
        // Establecer el estado inicial
        this._setInitialState();
        // Crear la animación de introducción
        this._createIntro();
        // Crear la animación del héroe
        this._createHero();
        // Crear la animación del texto
        this._createTextAnimation();
        // Crear la sección fijada
        this._createPinnedSection();
    }

    // Método para inicializar la aplicación
    _initialize(){
        // Crear una instancia de Lenis con opciones personalizadas
        this.lenis = new Lenis({
            lerp: 0.1 // Ajustar el factor de interpolación según sea necesario
        });
    }

    // Método para establecer el estado inicial de la aplicación
    _setInitialState() {
        // Establecer el estado inicial para varios elementos utilizando GSAP
        gsap.set(".hero__title span, .text__effect p, .fullwidth-image__text", {
            y:32,
            opacity: 0
        });

        gsap.set(".hero__images img", {
            opacity: 0,
            y: gsap.utils.random(100, 50) // Mover las imágenes de héroe aleatoriamente en el eje Y
        });

        gsap.set(".fullwidth-image img", {
            scale: 1.3 // Escalar las imágenes de ancho completo
        });
    }

    // Método para crear la animación de introducción
    _createIntro() {
        const tl = gsap.timeline();

        tl.to(".hero__title div", {
            opacity: 1

        }).to(".hero__title span", {
            y: 0,
            opacity: 1,
            ease: "expo.out",
            duration: 2,
            stagger: 0.01
        }).to(".hero__images img", {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 2,
            stagger: 0.01
        }, 0.5);
    }

    // Método para crear la animación del héroe
    _createHero() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub:true,
            }
        });

        this.heroImages.forEach(image => {
            tl.to(image, {
                ease: "none",
                yPercent: gsap.utils.random(-100, -50) // Mover las imágenes de héroe aleatoriamente en el eje Y
            }); 
        }, 0);
    }

    // Método para crear la animación del texto
    _createTextAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".text-block",
                start: "top center",
                end: "bottom top+=10%",
                scrub: true
            }
        });

        this.texts.forEach((text, index) => {
            const overlay = text.querySelector(".text__overlay");
            const content =text.querySelector("p");

            tl.to(overlay, {
                scaleX: 0
            }).to(content, {
                y: 0,
                opacity: 1,
                ease: "expo.out",
                duration: 2,
                delay: () => index * 0.1
            }, 0);
        });
    }

    // Método para crear la sección fijada
    _createPinnedSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".fullwidth-image",
                start: "top top",
                end: "+=1500",
                scrub: true,
                pin: true // Fijar la sección mientras se desplaza
            }
        });

        tl.to(".fullwidth-image__overlay", {
            opacity: 0.4

        }).to(".fullwidth-image", {
            "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

        }, 0).to(".fullwidth-image img", {
            scale: 1.5

        }, 0).to(".fullwidth-image__text", {
            y: 0,
            opacity: 1
        }, 0);
    }

    // Método para renderizar la aplicación utilizando Lenis en el ciclo de renderizado
    _render(){
        this.lenis.raf(performance.now());
        requestAnimationFrame(this._render.bind(this));
    }
}

// Iniciar la aplicación
new App();


// Obtener el botón por su ID
const insomniaButton = document.getElementById("insomniaButton");

// Agregar un controlador de eventos de clic al botón
insomniaButton.addEventListener("click", function() {
    // Abrir el enlace en una nueva pestaña al hacer clic en el botón
    window.open("https://emanuelb1.github.io/insomnia_01/", "_blank");
});


var c = document.getElementById("c");
var ctx = c.getContext("2d");

// Haciendo el canvas pantalla completa
c.height = window.innerHeight;
c.width = window.innerWidth;

// Caracteres chinos - tomados del conjunto de caracteres Unicode
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
// Convirtiendo la cadena en un array de caracteres individuales
matrix = matrix.split("");

var font_size = 10;
var columns = c.width/font_size; // número de columnas para la lluvia
// un array de gotas - una por columna
var drops = [];
// x es la coordenada x
// 1 = coordenada y de la gota (igual para cada gota inicialmente)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

// dibujando los caracteres
function draw()
{
    // Fondo negro para el canvas
    // Fondo translúcido para mostrar la estela
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#00FF00"; // Texto verde
    ctx.font = font_size + "px arial";
    // iterando sobre las gotas
    for(var i = 0; i < drops.length; i++)
    {
        // un carácter chino aleatorio para imprimir
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        // x = i*font_size, y = valor de drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        // enviando la gota de vuelta arriba aleatoriamente después de que haya cruzado la pantalla
        // agregando aleatoriedad al reinicio para dispersar las gotas en el eje Y
        if(drops[i]*font_size > c.height && Math.random() > 0.975)
            drops[i] = 0;

        // incrementando la coordenada Y
        drops[i]++;
    }
}

setInterval(draw, 35);

