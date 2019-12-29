import {getCollection} from "./helpers";

export class Modal {
  element: HTMLElement;
  iframe: HTMLIFrameElement;

  constructor(id) {
    this.element = document.getElementById(id);
    this.element.querySelector('.modal').addEventListener('click', (e) => e.stopPropagation());
    this.element.addEventListener('click', () => this.hide());
    this.element.querySelector('.modal__close').addEventListener('click', () => this.hide());
    this.iframe = this.element.querySelector('iframe[data-src]');

    getCollection(`[show-${id}]`).forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault();
        this.show();
      })
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode == 27) this.hide();
    });
  }

  show() {
    if (this.iframe && !this.iframe.src) {
      this.initIframe();
    }
    this.element.classList.add('active');
  }

  hide() {
    this.element.classList.remove('active');
  }

  initIframe() {
    this.iframe.src = this.iframe.dataset.src;
  }
}
