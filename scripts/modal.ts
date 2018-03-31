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
    import(/* webpackChunkName: "firebase" */'firebase/app').then(firebase => {
      console.log(firebase);
      firebase.initializeApp({
        apiKey: "AIzaSyDREXeKct-7pvIL4Pd4b1NefLJx9Q9yrQI",
        authDomain: "api-project-76220702.firebaseapp.com",
        databaseURL: "https://api-project-76220702.firebaseio.com",
        projectId: "api-project-76220702",
        storageBucket: "api-project-76220702.appspot.com",
        messagingSenderId: "944218460441"
      });
    });
    this.hide();
  }

  show() {
    this.element.classList.add('active');
  }

  hide() {
    this.element.classList.remove('active');
  }
}
