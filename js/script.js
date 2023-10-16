'use strict'

window.addEventListener('DOMContentLoaded', () => {
// Табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });

    // Таймер
    
    const deadline = '2023-09-25';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        }
        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateCloak, 1000);
        updateCloak();

        function updateCloak() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    // Модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
        //   modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
        
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    // modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    }); 
    
    document.addEventListener('keydown', (e) => {
       if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
       } 
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); 
         }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек
    // const menuOldCard = document.querySelectorAll('.menu__item');
    // menuOldCard.forEach(item => item.remove());
    class MenuCard {
        constructor(src, title, altImg, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.title = title;
            this.altImg = altImg;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render () {
            let element = document.createElement('div');
            if (this.classes.length == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.altImg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, title, altimg, descr, price}) => {
    //             new MenuCard(img, title, altimg, descr, price, '.menu__field .container').render();
    //         });
    //     });
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, title, altimg, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container'). append(element);
    //     });
    // }


    // const menuCardVegy = new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     'Меню "Фитнес"', 
    //     "vegy", 
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     9, 
    //     '.menu__field .container',
    //     'menu__item',
    //     'big'),
    // menuCardElite = new MenuCard(
    //     "img/tabs/elite.jpg", 
    //     'Меню “Премиум”', 
    //     "elite", 
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     20, 
    //     '.menu__field .container',
    //     'menu__item'),
    // menuCardPost = new MenuCard(
    //     "img/tabs/post.jpg", 
    //     'Меню "Постное"', 
    //     "post", 
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     15, 
    //     '.menu__field .container',
    //     'menu__item');
    
    // menuCardVegy.render();
    // menuCardElite.render();
    // menuCardPost.render();

    //  Forms
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, title, altimg, descr, price}) => {
                new MenuCard(img, title, altimg, descr, price, '.menu__field .container').render();
            });
        });
   
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            //Передача информации с помощью FormData
            // request.setRequestHeader('Content-type', 'multipart/form-data'); при использовании XMLHttpRequest в сочетании с FormData ставить заглавие не нужно
            // если передаем в формате JSON, то заголовок нужен + надо превратить FormData в JSON

            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const json = JSON.stringify(object);

            // request.send(json);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>

        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
    // Fetch API
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type' : 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));

    // Slider
    let counterSlider = 1;
    const offerSlide = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          offerSliderCur = document.querySelector('#current'),
          offerSliderTotal = document.querySelector('#total'),
          sliderBtnPrev = document.querySelector('.offer__slider-prev'),
          sliderBtnNext = document.querySelector('.offer__slider-next'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
    let offset = 0;

    offerSliderTotal.innerHTML = `<span id="total">${offerSlide.length < 10 ? "0" + offerSlide.length : offerSlide.length}</span>`;
    offerSliderCur.innerHTML = `<span id="current">${counterSlider < 10 ? "0" + (counterSlider) : (counterSlider)}</span>`;

    slidesField.style.width = 100 * offerSlide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    offerSlide.forEach(slide => {
        slide.style.width = width;
    });
    slider.style.position = 'relative';

    function transNumber (str) {
        return +str.replace(/\D/g, '');
    }

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    for (let i = 0; i < offerSlide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    };
    
    sliderBtnNext.addEventListener('click', () => {
        if (offset == transNumber(width) * (offerSlide.length - 1)) {
            offset = 0;
        } else {
            offset += transNumber(width);
        }
        slidesField.style.transform =`translateX(-${offset}px)`;
        if (counterSlider == offerSlide.length) {
            counterSlider = 1;
        } else {
            counterSlider++;
        }
        offerSliderCur.innerHTML = `<span id="current">${counterSlider < 10 ? "0" + (counterSlider) : (counterSlider)}</span>`; 

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[counterSlider - 1].style.opacity = '1';
    });
    sliderBtnPrev.addEventListener('click', () => {
        if (offset == 0) { 
            offset = transNumber(width) * (offerSlide.length - 1);
        } else {
            offset -= transNumber(width);
        }
        slidesField.style.transform =`translateX(-${offset}px)`;
        if (counterSlider == 1) {
            counterSlider = offerSlide.length;
        } else {
            counterSlider--;
        }
        offerSliderCur.innerHTML = `<span id="current">${counterSlider < 10 ? "0" + (counterSlider) : (counterSlider)}</span>`; 

        dots.forEach(dot => dot.style.opacity = '0.5' );
        dots[counterSlider - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            counterSlider = slideTo;
            offset = transNumber(width) * (slideTo - 1);

            slidesField.style.transform =`translateX(-${offset}px)`;

            offerSliderCur.innerHTML = `<span id="current">${counterSlider < 10 ? "0" + (counterSlider) : (counterSlider)}</span>`; 

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[counterSlider - 1].style.opacity = '1';
        });
    })

    // Калькулятор

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio = 1.375;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function calcTotal() {
        if (!sex|| !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else { 
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });     
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '3px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;    
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

});