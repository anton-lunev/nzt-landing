interface imgItem {
  el: HTMLImageElement
  src: string,
  bg: string
}

export class LazyLoading {
  winHeight = innerHeight;
  items: imgItem[] = [];
  itemsInProgress: imgItem[] = [];

  constructor(selector = '.lazy,[data-bg]') {
    Array.from(document.querySelectorAll(selector)).forEach((el: HTMLImageElement) => {
      this.items.push({el, src: el.dataset.src, bg: el.dataset.bg});
    });
    this.init();
  }

  init() {
    //TODO move it to general scroll/resize class
    document.addEventListener('scroll', () => requestAnimationFrame(this.handleScroll), {passive: true});
    window.addEventListener('resize', () => {
      this.winHeight = innerHeight;
      requestAnimationFrame(this.handleScroll);
    });
    this.handleScroll();
  }

  handleScroll = () => {
    const winY = scrollY;
    const winBottom = winY + this.winHeight;
    const winPos = {winY, winBottom};
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.loadItem(this.items[i], winPos)
    }
  };

  loadItem(item: imgItem, winPos) {
    const el = item.el;
    const imgY = this.getTopCoord(el);
    const offset = 800;

    // If block is shown on screen
    if (winPos.winBottom + offset > imgY && winPos.winY - offset < imgY + item.el.offsetHeight) {
      this.items.splice(this.items.indexOf(item), 1);
      this.itemsInProgress.push(item);
      this.downloadImg(item);
    }
  }

  downloadImg(item: imgItem) {
    const img = new Image();
    img.onload = () => {
      if (item.src) {
        item.el.src = item.src;
      } else if (item.bg) {
        item.el.style.backgroundImage = `url("${item.bg}")`;
      }
      item.el.classList.add('active');
    };
    img.src = item.src || item.bg;
  }

  private getTopCoord(elem: HTMLElement): number {
    return elem.getBoundingClientRect().top + pageYOffset;
  }
}
