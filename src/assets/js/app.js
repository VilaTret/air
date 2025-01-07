const menuBtn = document.querySelector('.menu__btn');
const menuCloseBtn = document.querySelector('.menu__close-btn');
const menuList = document.querySelector('.menu__list');

menuBtn.addEventListener('click', () => {
    menuList.classList.toggle('menu__list--open');
});

menuCloseBtn.addEventListener('click', () => {
    menuList.classList.remove('menu__list--open');
});

document.addEventListener('click', event => {
    if (
        !menuList.contains(event.target) &&
        !menuBtn.contains(event.target) &&
        !menuCloseBtn.contains(event.target)
    ) {
        menuList.classList.remove('menu__list--open');
    }
});
