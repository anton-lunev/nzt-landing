export class Slider {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.buttonPrev = this.container.querySelector('.b1-slider__button--left');
    this.buttonNext = this.container.querySelector('.b1-slider__button--right');

    this.slides = this.container.querySelectorAll('.b1-slider__slide');
    this.active = this.container.querySelector('.active');

    this.animationTime = 400;
    this.container.style.setProperty('--animation-time', `${this.animationTime}ms`);
    this.init();
  }

  init() {
    this.buttonPrev.addEventListener('click', () => this.prev());
    this.buttonNext.addEventListener('click', () => this.next());
  }

  next() {
    const nextElement = this.active.nextElementSibling || this.slides[0];
    this.removeActive(nextElement);
  }

  prev() {
    const nextElement = this.active.previousElementSibling || this.slides[this.slides.length];
    this.removeActive(nextElement);
  }

  removeActive(nextElement) {
    this.active.classList.add('remove');

    setTimeout(() => {
      this.active.classList.remove('remove', 'active');
      this.active = nextElement;
      this.active.classList.add('active');
    }, 400);
  }
}
