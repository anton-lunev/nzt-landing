import {getCollection} from "./helpers";

export class Modal {
  element: HTMLElement;

  constructor(selector = 'modal') {
    this.element = document.getElementById('modal');
    this.element.querySelector('.modal__close').addEventListener('click', () => this.hide());
    this.element.querySelector('.modal__subscribe').addEventListener('click', () => this.subscribe());

    getCollection('[show-modal]').forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault();
        this.show();
      })
    });
  }

  subscribe() {

    this.hide();
  }

  show() {
    this.element.classList.add('active');
  }

  hide() {
    this.element.classList.remove('active');
  }
}
