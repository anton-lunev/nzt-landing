import {getCollection} from "./helpers";

export class Modal {
  element: HTMLElement;

  constructor(id) {
    this.element = document.getElementById(id);
    this.element.querySelector('.modal__close').addEventListener('click', () => this.hide());

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
    this.element.classList.add('active');
  }

  hide() {
    this.element.classList.remove('active');
  }
}

export class SubscribeModal extends Modal {
  form: HTMLFormElement;

  constructor(id) {
    super(id);

    this.form = this.element.querySelector('form');

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.subscribe()
    });
  }

  async subscribe() {
    const firebase = (await import(/* webpackChunkName: "firebase" */ './firebase')).default;
    const data = this.getData();

    firebase.initializeApp({
      apiKey: "AIzaSyDREXeKct-7pvIL4Pd4b1NefLJx9Q9yrQI",
      authDomain: "api-project-76220702.firebaseapp.com",
      databaseURL: "https://api-project-76220702.firebaseio.com",
      projectId: "api-project-76220702",
      storageBucket: "api-project-76220702.appspot.com",
      messagingSenderId: "944218460441"
    });

    const key = firebase.database().ref('UserContacts').push().key;
    firebase.database().ref(`UserContacts/${key}`).set(data)
      .then(() => {
        this.hide();
        this.form.reset();
      });
  }

  private getData(): { email?: string, phone?: string } {
    return getCollection('input', this.form)
      .reduce((res, item: HTMLInputElement) => ({...res, [item.name]: item.value}), {});
  }
}
