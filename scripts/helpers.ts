import Scrollbar from "smooth-scrollbar";

export interface WinPositions {
  winY: number,
  winBottom: number
}

class ScrollHelper {
  static instance;
  winHeight = innerHeight;
  subscriptions = [];
  scrollbar: Scrollbar;
  scrollY = 0;

  constructor() {
    if (ScrollHelper.instance) return ScrollHelper.instance;

    this.scrollbar = Scrollbar.init(document.querySelector('body'), {});
    this.scrollbar.addListener(({offset}) => {
      this.scrollY = offset.y;
      requestAnimationFrame(this.handleScroll);
    });

    // document.addEventListener('scroll', () => requestAnimationFrame(this.handleScroll), {passive: true});
    window.addEventListener('resize', () => {
      this.winHeight = innerHeight;
      requestAnimationFrame(this.handleScroll);
    });

    ScrollHelper.instance = this;
  }

  private handleScroll = () => {
    const winPos = this.getPositions();
    this.subscriptions.forEach(cb => cb(winPos));
  };

  private getPositions(): WinPositions {
    const winY = this.scrollY;
    const winBottom = winY + this.winHeight;
    return {winY, winBottom};
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
    cb(this.getPositions());
  }

  unsubscribe(cb) {
    this.subscriptions.splice(this.subscriptions.indexOf(cb), 1);
  }

  getTopCoord(elem: HTMLElement): number {
    return elem.getBoundingClientRect().top + this.scrollY;
  }
}

export const scrollHelper = new ScrollHelper();


export function getCollection(selector, container: any = document): Element[] {
  return Array.from(container.querySelectorAll(selector));
}
