export interface WinPositions {
  winY: number,
  winBottom: number
}

class ScrollHelper {
  static instance;
  winHeight = innerHeight;
  subscriptions = [];

  constructor() {
    if (ScrollHelper.instance) return ScrollHelper.instance;

    document.addEventListener('scroll', () => requestAnimationFrame(this.handleScroll), {passive: true});
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
    const winY = scrollY;
    const winBottom = winY + this.winHeight;
    return {winY, winBottom};
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
    cb(this.getPositions());
  }

  getTopCoord(elem: HTMLElement): number {
    return elem.getBoundingClientRect().top + pageYOffset;
  }
}

export const scrollHelper = new ScrollHelper();


export function getCollection(selector, container: any = document): Element[] {
  return Array.from(container.querySelectorAll(selector));
}
