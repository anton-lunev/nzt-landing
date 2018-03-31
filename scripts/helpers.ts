export interface WinPositions {
  winY: number,
  winBottom: number
}

class ScrollHelper {
  static instance;
  private isWindows = navigator.userAgent.includes("Windows");
  private winHeight = innerHeight;
  private subscriptions = [];
  private scrollY = 0;

  constructor() {
    if (ScrollHelper.instance) return ScrollHelper.instance;
    this.initEvents();
    ScrollHelper.instance = this;
  }

  private initEvents() {
    if (!this.isWindows) {
      import(/* webpackChunkName: "scrollbar" */'smooth-scrollbar').then((Scrollbar) => {
        const el = document.querySelector('#scroll-wrapper') as HTMLElement;
        el.classList.add('custom-scroll');
        const scrollbar = Scrollbar.default.init(el);
        scrollbar.addListener(({offset}) => {
          this.scrollY = offset.y;
          requestAnimationFrame(this.handleScroll);
        });
      });
    } else {
      document.addEventListener('scroll', () => {
        this.scrollY = pageYOffset;
        requestAnimationFrame(this.handleScroll);
      }, {passive: true});
    }

    window.addEventListener('resize', () => {
      this.winHeight = innerHeight;
      requestAnimationFrame(this.handleScroll);
    });
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
