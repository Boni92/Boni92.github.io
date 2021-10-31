let animadoX = document.querySelectorAll(".animadoX")

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;
    for (var i=0; i<animadoX.length; i++) {
        let alturaAnimadoX = animadoX[i].offsetTop;
        if(alturaAnimadoX - 500< scrollTop) {
            animadoX[i].style.opacity=1;
            animadoX[i].classList.add("mostrarIzquierda");
        }
    }
}

window.addEventListener('scroll', mostrarScroll)

//===============================================

let animadoXd = document.querySelectorAll(".animadoXd")

function mostrarScroll2() {
    let scrollTop = document.documentElement.scrollTop;
    for (var i=0; i<animadoXd.length; i++) {
        let alturaAnimadoXd = animadoXd[i].offsetTop;
        if(alturaAnimadoXd - 500< scrollTop) {
            animadoXd[i].style.opacity=1;
            animadoXd[i].classList.add("mostrarDerecha");
        }
    }
}

window.addEventListener('scroll', mostrarScroll2)

//===============================================

let animado = document.querySelectorAll(".animado")

function mostrarScroll3() {
    let scrollTop = document.documentElement.scrollTop;
    for (var i=0; i<animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if(alturaAnimado - 50 < scrollTop) {
            animado[i].style.opacity=1;
        }
    }
}

window.addEventListener('scroll', mostrarScroll3)

//===============================================

let animadoXa = document.querySelectorAll(".animadoXa")

function mostrarScroll4() {
    let scrollTop = document.documentElement.scrollTop;
    for (var i=0; i<animadoXa.length; i++) {
        let alturaAnimadoXa = animadoXa[i].offsetTop;
        if(alturaAnimadoXa - 500< scrollTop) {
            animadoXa[i].style.opacity=1;
            animadoXa[i].classList.add("mostrarAbajo");
        }
    }
}

window.addEventListener('scroll', mostrarScroll4)

//===============================================

// const text = document.querySelector(".hola");
// const strText = text.textContent
// const splitText = strText.split("");
// text.textContent = ""
// for (let i = 0; i < splitText.length; i++) {
//     text.innerHTML += "<span>" + splitText[i] + "</span>";
// }

// let char = 0;
// let timer = setInterval(onTick, 50);

// function onTick(){
//     const span = text.querySelectorAll("span")[char];
//     span.classList.add("fade");
//     char++
//     if (char === splitText.length) {
//         complete();
//         return;
//     }
// }
// function complete(){
//     clearInterval(timer);
//     timer = null;
// }


