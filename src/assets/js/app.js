import flatpickr from 'flatpickr';
import Choices from 'choices.js';
import Awesomplete from 'awesomplete';

const usernameGeoNamesApi = 'vilatret';
const countryGeoNamesApi = 'US';
const languageGeoNamesApi = 'en';
let listAirports = [];
const today = new Date();

const menuBtn = document.querySelector('.menu__btn');
const menuCloseBtn = document.querySelector('.menu__close-btn');
const menuList = document.querySelector('.menu__list');
const routeSelectionInputFrom = document.getElementById(
    'route-selection__input-from',
);
const routeSelectionFrom = document.getElementById('route-selection__from');
const routeSelectionInputTo = document.getElementById(
    'route-selection__input-to',
);
const routeSelectionTo = document.getElementById('route-selection__to');
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

await fetch(
    `http://api.geonames.org/searchJSON?formatted=true&lang=${languageGeoNamesApi}&featureClass=S&featureCode=AIRP&country=${countryGeoNamesApi}&username=${usernameGeoNamesApi}`,
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

new Awesomplete(routeSelectionInputFrom, {
    list: listAirports.map(airport => ({
        label: `${shortenAirportName(airport.name)}, ${airport.adminCode1}`,
        value: shortenAirportName(airport.name),
    })),
});

new Awesomplete(routeSelectionInputTo, {
    list: listAirports.map(airport => ({
        label: `${shortenAirportName(airport.name)}, ${airport.adminCode1}`,
        value: shortenAirportName(airport.name),
    })),
});

const departureFp = flatpickr('#date-selection__input-departure', {
    dateFormat: 'D d M',
    defaultDate: today,
});

const returnFp = flatpickr('#date-selection__input-return', {
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

routeSelectionInputFrom.addEventListener('input', () => {
    listAirports.some(airport => {
        routeSelectionFrom.textContent = '';
        const shortenName = shortenAirportName(airport.name);
        if (routeSelectionInputFrom.value === shortenName) {
            routeSelectionFrom.textContent = `${shortenName}, ${airport.adminCode1}`;
            return true;
        }
    });
});

routeSelectionInputFrom.addEventListener('awesomplete-select', event => {
    routeSelectionFrom.textContent = event.text.label;
});

routeSelectionInputTo.addEventListener('input', () => {
    listAirports.some(airport => {
        routeSelectionTo.textContent = '';
        const shortenName = shortenAirportName(airport.name);
        if (routeSelectionInputTo.value === shortenName) {
            routeSelectionTo.textContent = `${shortenName}, ${airport.adminCode1}`;
            return true;
        }
    });
});

routeSelectionInputTo.addEventListener('awesomplete-select', event => {
    routeSelectionTo.textContent = event.text.label;
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
