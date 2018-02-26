// slider

var nessSlider = document.getElementById('nessSlider'),
    sliders = nessSlider.getElementsByClassName('nessSlide'),
    activeSliderCount = 0,
    dotsWrap = document.getElementById('nessSliderDotsWrap'),
    dots,
    sliderInterval = 8400,
    sliderTimeout;

function switchSlider(t = null, r = null) {
    for (var i = 0; i < dots.length; i++) {
        dots[i].removeEventListener('click', clickDot)
    }

    var newSliderCount;

    if (t) {
        newSliderCount = parseInt(t.getAttribute('data-target'), 10);
    } else {
        if (activeSliderCount + 1 >= sliders.length) {
            newSliderCount = 0;
        } else {
            newSliderCount = activeSliderCount + 1;
        }
    }

    sliders[activeSliderCount].classList.add('off')
    dots[activeSliderCount].className = 'fa fa-circle-o';
    dots[newSliderCount].className = 'fa fa-circle';
    window.setTimeout(function() {
        sliders[activeSliderCount].classList.remove('in')
        sliders[newSliderCount].classList.add('in')
        sliders[newSliderCount].classList.add('on')

        sliders[activeSliderCount].classList.remove('on')
        sliders[activeSliderCount].classList.remove('off')

        activeSliderCount = newSliderCount;

        if (r) { sliderTimeout = window.setInterval(switchSlider, sliderInterval); }

        for (var i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', clickDot)
        }
    }, 400)
}

function clickDot(e) {
    if (e.target.getAttribute('data-target') != activeSliderCount) {
        window.clearInterval(sliderTimeout)
        switchSlider(e.target, true)
    }
}

function setDots() {
    for (var i = 0; i < sliders.length; i++) {
        var icon = document.createElement('i');
        icon.setAttribute('aria-hidden', 'true')
        icon.setAttribute('data-target', i)

        if (i == activeSliderCount) {
            icon.className = 'fa fa-circle';
        } else {
            icon.className = 'fa fa-circle-o';
        }

        dotsWrap.appendChild(icon)
        icon.addEventListener('click', clickDot)
    }

    dots = dotsWrap.getElementsByTagName('i');
}


// init

setDots()
sliders[0].classList.add('on')
sliderTimeout = window.setInterval(switchSlider, sliderInterval);