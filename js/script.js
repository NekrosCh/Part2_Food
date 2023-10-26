'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          modals = require('./modules/modals'),
          timers = require('./modules/timers'),
          sliders = require('./modules/sliders'),
          forms = require('./modules/forms'),
          cards = require('./modules/cards'),
          calc = require('./modules/calc');

    tabs();
    modals();
    timers();
    sliders();
    forms();
    cards();
    calc();

});