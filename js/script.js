let img1 = document.getElementById('willSprite1');
let img2 = document.getElementById('willSprite2');
let img3 = document.getElementById('willSprite3');
let img4 = document.getElementById('willSprite4');

img1.setAttribute('src','img/will_sprite_1.png');
img2.setAttribute('src','img/will_sprite_2.png');
img3.setAttribute('src','img/will_sprite_3.png');
img4.setAttribute('src','img/will_sprite_4.png');

[img1, img2, img3, img4].forEach(img =>{
    img.addEventListener('load',()=> imgLoaded(img));
    img.addEventListener('error',()=> errorLoadImage(img));
});


let numeroDeImagensCarregadas = 0;

async function imgLoaded(imgLoad){
    let imgContainer = document.getElementById('imgContainer');
    
    numeroDeImagensCarregadas++;

    if(numeroDeImagensCarregadas == 1) {
        imgContainer.style.setProperty('display','block');
        mudaPosicaoDaImagem();
    }
    if(numeroDeImagensCarregadas == 4) mudarEstadoDoIconeDeLoad();

    console.log(`imgLoaded()=> Imagem carregada: ${imgLoad.src}; numeroDeImagensCarregadas:${numeroDeImagensCarregadas}`);
}

async function errorLoadImage(imgErr) {
    let errorContainer = document.getElementById('errorContainer');
    errorContainer.style.setProperty('display','block');
    
    mudarEstadoDoIconeDeLoad('error');

    console.log(`errorLoadImage()=> Erro ao carregar imagem ${imgErr.title}`);
}

async function mudarEstadoDoIconeDeLoad(estado = 'complete'){
    let loadIconSpin = document.getElementById('loadingSpin');
    let infoScreen = document.getElementById('infoScreen');

    loadIconSpin.classList.add(estado);
    infoScreen.classList.add(estado);

    console.log(`mudarEstadoDoIconeDeLoad()=> estado: ${estado}`);
};

['touchstart','touchmove','touchend'].forEach(type =>{
    window.addEventListener(type, (ev) =>{
        let touch = ev.touches[0];
        if(numeroDeImagensCarregadas >= 1) registraNovaPosicao(touch.clientX);
    });
});

window.addEventListener('mousemove', (ev) => {if(numeroDeImagensCarregadas >= 1) registraNovaPosicao(ev.clientX)});


let arrayPosicoes = new Array();

function registraNovaPosicao(cursorPosicao) {
    let windowSize = document.body.scrollWidth; 
    let porcentagemDoCursor = Math.round(Math.max(Math.min(cursorPosicao * 100 / windowSize, 99),0));
    let frameAtual = 119 - Math.round(porcentagemDoCursor / 100 * 120);
    let marginLeft = (img1.scrollWidth / 30) * frameAtual; 

    arrayPosicoes.push(`-${marginLeft}px`);
}

async function mudaPosicaoDaImagem() {
    if(arrayPosicoes.length > 0) {
        console.log(`mudaPosicaoDaImagem()=> posição atual: -${arrayPosicoes[0]}px`);

        img1.style.setProperty('margin-left', arrayPosicoes[0]);
        arrayPosicoes.shift();
    }
    setTimeout(()=>mudaPosicaoDaImagem(), 1);
}