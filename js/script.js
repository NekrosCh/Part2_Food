'use strict'
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modals from './modules/modals';
import timers from './modules/timers';
import sliders from './modules/sliders';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import {openModal} from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    tabs('.tabheader__item','.tabcontent', '.tabheader', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerId);
    timers('.timer', '2023-12-11');
    sliders({
        container:'.offer__slider', 
        slide:'.offer__slide', 
        nextArrow:'.offer__slider-next', 
        prevArrow:'.offer__slider-prev', 
        totalCounter:'#total', 
        currentCounter:'#current', 
        wrapper:'.offer__slider-wrapper', 
        field:'.offer__slider-inner'
    });
    forms('form', modalTimerId);
    cards();
    calc();

});