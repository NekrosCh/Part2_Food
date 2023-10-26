function sliders() {
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
}

module.exports = sliders;