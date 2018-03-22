import {getCollection, scrollHelper, WinPositions} from "./helpers";

const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="39" height="39">
  <circle class="arrow-circle" cx="19.5" cy="19.5" r="19" fill="none" stroke="currentColor"/>
  <path fill="currentColor" stroke="currentColor" d="M23 25.42l-1.185 1.19-7.106-7.11 7.106-7.11L23 13.58l-5.923 5.92z"/>
</svg>`;

const leftArrow = `<button class="slider__button slider__button--left">${arrowIcon}</button>`;
const rightArrow = `<button class="slider__button slider__button--right">${arrowIcon}</button>`;

function parseDom(string: string): HTMLElement {
  const doc = new DOMParser().parseFromString(string, "text/html");
  return doc.body.childNodes[0] as HTMLElement;
}

enum selectors {
  active = 'active',
  remove = 'remove',
  slider = 'slider',
  sliderContent = 'slider__content',
  sliderSlide = 'slider__slide',
  sliderButton = 'slider__button'
}

export class Slider {
  animationTime = 400;
  container: HTMLElement;
  slides: HTMLCollection;
  buttonPrev = parseDom(leftArrow) as HTMLButtonElement;
  buttonNext = parseDom(rightArrow) as HTMLButtonElement;
  activeSlide: Element;
  timer: number;

  constructor(selector) {
    this.container = document.querySelector(selector);
    this.container.classList.add(selectors.slider);
    this.slides = this.container.firstElementChild.children;

    this.initActiveSlide();
    this.init();
  }

  private init() {
    this.container.firstElementChild.classList.add(selectors.sliderContent);
    Array.from(this.slides).forEach(elem => elem.classList.add(selectors.sliderSlide));

    getCollection(`.${selectors.sliderButton}`, this.container).forEach(el => el.remove());
    this.container.appendChild(this.buttonNext);
    this.container.insertBefore(this.buttonPrev, this.container.firstElementChild);

    this.container.style.setProperty('--animation-time', `${this.animationTime}ms`);

    // this.restartTimer();
    this.subscribe();
  }

  private initActiveSlide() {
    this.activeSlide = this.container.querySelector(`.${selectors.active}`) || this.slides[0];
    this.activeSlide.classList.add(selectors.active);
  }

  private subscribe() {
    this.buttonPrev.addEventListener('click', this.prev);
    this.buttonNext.addEventListener('click', this.next);
    this.container.addEventListener('mouseover', () => this.stopTimer());
    this.container.addEventListener('mouseout', () => this.restartTimer());
    scrollHelper.subscribe(this.handleScroll);
  }

  destroy() {
    this.buttonPrev.removeEventListener('click', this.prev);
    this.buttonNext.removeEventListener('click', this.next);
    this.container.removeEventListener('mouseover', this.stopTimer);
    this.container.removeEventListener('mouseout', this.restartTimer);
  }

  handleScroll = (winPos: WinPositions) => {
    const el = this.container;
    const imgY = scrollHelper.getTopCoord(el);
    const imgH = el.offsetHeight;

    // If block is shown on screen
    if (winPos.winBottom > imgY && winPos.winY < imgY + imgH) {
      if (!this.timer) {
        this.restartTimer();
      }
    } else if(this.timer) {
      this.stopTimer();
    }
  };

  next = () => {
    const nextElement = this.activeSlide.nextElementSibling || this.slides[0];
    this.changeActiveSlide(nextElement);
  };

  prev = () => {
    const nextElement = this.activeSlide.previousElementSibling || this.slides[this.slides.length - 1];
    this.changeActiveSlide(nextElement);
  };

  private changeActiveSlide(nextElement: Element) {
    this.activeSlide.classList.add(selectors.remove);

    setTimeout(() => {
      this.activeSlide.classList.remove(selectors.remove, selectors.active);
      this.activeSlide = nextElement;
      this.activeSlide.classList.add(selectors.active);
    }, this.animationTime);

    this.restartTimer();
  }

  private stopTimer = () => {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  };

  private restartTimer = () => {
    this.stopTimer();
    this.timer = setInterval(this.next, 4000);
  }
}
