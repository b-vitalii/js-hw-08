import images from "./gallery-items.js";

let refs = {
    gallery: document.querySelector(`.gallery`),
    mainDiv: document.querySelector(`.lightbox`),
    div: document.querySelector(`.lightbox__overlay`),
    image: document.querySelector(`.lightbox__image`),
    btnClose: document.querySelector(`.lightbox__button`),
    btnNext: document.querySelector(`.lightbox__button__next`),
    btnPrev: document.querySelector(`.lightbox__button__prev`)
}

let imgSrc = [];
let index = 0;

// console.log(refs);
let createItem = ({description, preview, original}) => {
    let img = `<li class="gallery__item">
    <a class="gallery__link">
    <img src="${preview}" alt="${description}" data-source="${original}" class="gallery__image"></li>`
    imgSrc.push(original)
    refs.gallery.insertAdjacentHTML("afterbegin", img);
};  
images.reduce((acc, item) => acc + createItem(item), "");

refs.gallery.addEventListener(`click`, openModal)

function openModal(event){
    if (event.target.nodeName !== `IMG`) {return}
    let imagRef = event.target;
    let largeImgURL = imagRef.dataset.source;
    refs.mainDiv.classList.add('is-open');
    refs.image.src = largeImgURL;
    window.addEventListener(`keydown`, closeBackdropEscEnter)
    window.addEventListener(`keydown`, closeBackdropEscEnter)
    window.addEventListener(`keydown`, arrowPress)
    refs.div.addEventListener(`click`, closeBackdropEscEnter)
    refs.btnClose.addEventListener(`click`, closeModal)
    refs.btnNext.addEventListener(`click`, arrowPress)
    refs.btnPrev.addEventListener(`click`, arrowPress)
    
}

function closeModal() {
    refs.mainDiv.classList.remove('is-open');
    window.removeEventListener(`keydown`, closeBackdropEscEnter);
    window.removeEventListener(`keydown`, closeBackdropEscEnter);
    window.removeEventListener(`keydown`, arrowPress);
    refs.btnNext.removeEventListener(`click`, arrowPress)
    refs.btnPrev.removeEventListener(`click`, arrowPress)
    refs.image.src = ``;
}
// function backDropClose(event) {if(event.target.nodeName === event.currentTarget.nodeName){closeModal()}}
// function enterClose(event) {if (event.code === `Enter`){closeModal()}}
function closeBackdropEscEnter(event) {
    if ((event.code === `Escape`) || (event.code === `Enter`) || (event.target.nodeName === event.currentTarget.nodeName)){
        closeModal()
    }
}

function updateImg (index) {
    refs.image.src = imgSrc[index];
}
function arrowPress (event) {
    if ((event.which === 39) || (event.which === 1 && event.target === refs.btnNext)){
        index += 1;
        index === imgSrc.length ? (index = 0) : index;
    }
    if ((event.which === 37) || (event.which === 1 && event.target === refs.btnPrev)) {
        index -= 1;
        index < 0 ? (index = imgSrc.length -1) : index;
    }
    updateImg(index);
}
