import flatpickr from 'flatpickr';
import Choices from 'choices.js';

const menuBtn = document.querySelector('.menu__btn');
const menuCloseBtn = document.querySelector('.menu__close-btn');
const menuList = document.querySelector('.menu__list');
const departureFpWrapper = document.getElementById(
    'flatpickr__input-departure-wrapper',
);
const returnFpWrapper = document.getElementById(
    'flatpickr__input-return-wrapper',
);
const departurePrevBtn = document.getElementById(
    'flatpickr-departure__prev-btn',
);
const departureNextBtn = document.getElementById(
    'flatpickr-departure__next-btn',
);
const returnPrevBtn = document.getElementById('flatpickr-return__prev-btn');
const returnNextBtn = document.getElementById('flatpickr-return__next-btn');
const addRequirementsBtn = document.getElementById(
    'book-flights__add-requirements-btn',
);
const addRequirementsTextarea = document.getElementById(
    'book-flights__add-requirements-textarea',
);

const today = new Date();

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

new Choices('#travel-options-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholder: false,
});

new Choices('#flight-type-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Flight Type',
});

new Choices('#person-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Person',
});

const departureFp = flatpickr('#date-selection__input-departure', {
    dateFormat: 'D d M',
    defaultDate: today,
});

const returnFp = flatpickr('#date-selection__input-return', {
    dateFormat: 'D d M',
    defaultDate: new Date().setDate(today.getDate() + 4),
});

departureFpWrapper.addEventListener('click', () => {
    departureFp.open();
});

returnFpWrapper.addEventListener('click', () => {
    returnFp.open();
});

departurePrevBtn.addEventListener('click', () => {
    const currentDate = departureFp.selectedDates[0] || new Date();
    const prevMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1),
    );
    departureFp.setDate(prevMonthDate);
});

departureNextBtn.addEventListener('click', () => {
    const currentDate = departureFp.selectedDates[0] || new Date();
    const nextMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1),
    );
    departureFp.setDate(nextMonthDate);
});

returnPrevBtn.addEventListener('click', () => {
    const currentDate = departureFp.selectedDates[0] || new Date();
    const prevMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1),
    );
    returnFp.setDate(prevMonthDate);
});

returnNextBtn.addEventListener('click', () => {
    const currentDate = departureFp.selectedDates[0] || new Date();
    const nextMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 1),
    );
    returnFp.setDate(nextMonthDate);
});

addRequirementsBtn.addEventListener('click', () => {
    addRequirementsTextarea.classList.add(
        'book-flights__add-requirements-input--open',
    );
    addRequirementsBtn.classList.add(
        'book-flights__add-requirements-btn--close',
    );
});
