import flatpickr from 'flatpickr';
import Choices from 'choices.js';
import Awesomplete from 'awesomplete';

const usernameGeoNamesApi = 'vilatret';
const countryGeoNamesApi = 'US';
const languageGeoNamesApi = 'en';
let listAirports = [];
const today = new Date();

const introBg = document.querySelector('.intro-bg__image');
const introContainer = document.querySelector('.intro-bg');
const menuBtn = document.querySelector('.menu__btn');
const menuCloseBtn = document.querySelector('.menu__close-btn');
const menuList = document.querySelector('.menu__list');
const routeSelectionFromInput = document.querySelector(
    '.route-selection__from-input',
);
const routeSelectionFromLocation = document.querySelector(
    '.route-selection__from-location',
);
const routeSelectionToInput = document.querySelector(
    '.route-selection__to-input',
);
const routeSelectionToLocation = document.querySelector(
    '.route-selection__to-location',
);
const routeSelectionInvertBtn = document.querySelector(
    '.route-selection__invert-btn',
);
const departureFpWrapper = document.querySelector(
    '.flatpickr__departure-input-wrapper',
);
const returnFpWrapper = document.querySelector(
    '.flatpickr__return-input-wrapper',
);
const departurePrevBtn = document.querySelector(
    '.flatpickr-departure__prev-btn',
);
const departureNextBtn = document.querySelector(
    '.flatpickr-departure__next-btn',
);
const returnPrevBtn = document.querySelector('.flatpickr-return__prev-btn');
const returnNextBtn = document.querySelector('.flatpickr-return__next-btn');
const addRequirementsBtn = document.querySelector(
    '.book-flights__add-requirements-btn',
);
const addRequirementsTextarea = document.querySelector(
    '.book-flights__add-requirements-textarea',
);

await fetch(
    `https://secure.geonames.org/searchJSON?formatted=true&lang=${languageGeoNamesApi}&featureClass=S&featureCode=AIRP&country=${countryGeoNamesApi}&username=${usernameGeoNamesApi}`,
)
    .then(response => response.json())
    .then(data => {
        listAirports = data.geonames;
    })
    .catch(error => console.error('Error fetching airports:', error));

function shortenAirportName(name) {
    return name
        .replace(/\bInternational\b/gi, 'Intl')
        .replace(/\bAirport\b/gi, 'Arpt');
}

new Choices('.travel-options-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholder: false,
});

new Choices('.flight-type-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Flight Type',
});

new Choices('.person-select-wrapper', {
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Person',
});

new Awesomplete(routeSelectionFromInput, {
    list: listAirports.map(airport => ({
        label: `${shortenAirportName(airport.name)}, ${airport.adminCode1}`,
        value: shortenAirportName(airport.name),
    })),
});

new Awesomplete(routeSelectionToInput, {
    list: listAirports.map(airport => ({
        label: `${shortenAirportName(airport.name)}, ${airport.adminCode1}`,
        value: shortenAirportName(airport.name),
    })),
});

const departureFp = flatpickr('.date-selection__input-departure', {
    dateFormat: 'D d M',
    defaultDate: today,
});

const returnFp = flatpickr('.date-selection__input-return', {
    dateFormat: 'D d M',
    defaultDate: new Date().setDate(today.getDate() + 4),
});

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

window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;
    let imgHeight = introBg.offsetHeight;
    let containerHeight = introContainer.offsetHeight;
    let maxScroll = containerHeight - imgHeight;
    if (scrollTop <= maxScroll) {
        introBg.style.transform = `translateY(${scrollTop}px)`;
    } else {
        introBg.style.transform = `translateY(${maxScroll}px)`;
    }
});

routeSelectionFromInput.addEventListener('input', () => {
    listAirports.some(airport => {
        routeSelectionFromLocation.textContent = '';
        const shortenName = shortenAirportName(airport.name);
        if (routeSelectionFromInput.value === shortenName) {
            routeSelectionFromLocation.textContent = `${shortenName}, ${airport.adminCode1}`;
            return true;
        }
    });
});

routeSelectionFromInput.addEventListener('awesomplete-select', event => {
    routeSelectionFromLocation.textContent = event.text.label;
});

routeSelectionToInput.addEventListener('input', () => {
    listAirports.some(airport => {
        routeSelectionToLocation.textContent = '';
        const shortenName = shortenAirportName(airport.name);
        if (routeSelectionToInput.value === shortenName) {
            routeSelectionToLocation.textContent = `${shortenName}, ${airport.adminCode1}`;
            return true;
        }
    });
});

routeSelectionToInput.addEventListener('awesomplete-select', event => {
    routeSelectionToLocation.textContent = event.text.label;
});

routeSelectionInvertBtn.addEventListener('click', () => {
    const inputFromValue = routeSelectionFromInput.value;
    const from = routeSelectionFromLocation.textContent;
    const inputToValue = routeSelectionToInput.value;
    const to = routeSelectionToLocation.textContent;
    routeSelectionFromInput.value = inputToValue;
    routeSelectionFromLocation.textContent = to;
    routeSelectionToInput.value = inputFromValue;
    routeSelectionToLocation.textContent = from;
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
    const currentDate = returnFp.selectedDates[0] || new Date();
    const prevMonthDate = new Date(
        currentDate.setMonth(currentDate.getMonth() - 1),
    );
    returnFp.setDate(prevMonthDate);
});

returnNextBtn.addEventListener('click', () => {
    const currentDate = returnFp.selectedDates[0] || new Date();
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
