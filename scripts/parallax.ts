enum directions {
  up = 'up',
  down = 'down'
}

export class Parallax {
  prlxElems: NodeListOf<Element>;
  scrollPosition = 0;
  positionsMap: { el: HTMLElement, coefficient: number, position: number }[] = [];

  constructor(selector?: string) {
    this.prlxElems = document.querySelectorAll(selector || '.prlx');
    this.prlxElems.forEach((el: HTMLElement) => this.positionsMap.push({el, coefficient: 1, position: 0}));
    this.init();
  }

  init() {
    document.addEventListener('scroll', this.handleScroll/*, {passive: true}*/);
    const observer = new IntersectionObserver((event, observer) => console.log(event, observer), {});
  }

  handleScroll = (event) => {
    const dir = this.getDirection();

    console.log('test', dir);
    console.log(window.scrollY);
    this.positionsMap.forEach((item) => {
      dir === directions.up ? item.position-- : item.position++;
      item.el.style.transform = `translateY(${item.position}px)`;
    });
  };

  getDirection(): directions {
    const res = window.scrollY < this.scrollPosition ? directions.up : directions.down;
    this.scrollPosition = window.scrollY;
    return res;
  }
}
