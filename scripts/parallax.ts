interface PositionsMapItem {
  el: HTMLElement;
  speed: number;
}

export class Parallax {
  prlxElems: NodeListOf<Element>;
  positionsMap: PositionsMapItem[] = [];
  winHeight = innerHeight;
  private positionVarName = '--position';

  constructor(selector?: string) {
    this.prlxElems = document.querySelectorAll(selector || '.prlx');
    this.prlxElems.forEach((el: HTMLElement) => {
      el.style.transform = `translateY(var(${this.positionVarName})) translateZ(0)`;
      this.positionsMap.push({el, speed: +el.dataset.speed || 1})
    });
    this.init();
  }

  init() {
    document.addEventListener('scroll', () => requestAnimationFrame(this.handleScroll), {passive: true});
    window.addEventListener('resize', () => {
      this.winHeight = innerHeight;
      requestAnimationFrame(this.handleScroll);
    });
    this.handleScroll();
  }

  private handleScroll = () => {
    const winY = scrollY;
    const winBottom = winY + this.winHeight;
    const winPos = {winY, winBottom};

    this.positionsMap.forEach((item) => {
      this.parallaxItem(item, winPos);
    });
  };

  private parallaxItem(item: PositionsMapItem, winPos) {
    const el = item.el;
    const speed = item.speed;
    const imgY = this.getTopCoord(el);
    const imgH = el.offsetHeight;

    // If block is shown on screen
    if (winPos.winBottom > imgY && winPos.winY < imgY + imgH) {
      const imgBottom = ((winPos.winBottom - imgY) * speed); // Number of pixels shown after block appear
      const imgTop = this.winHeight + imgH; // Max number of pixels until block disappear
      const position = ((imgBottom / imgTop) * 100) + (50 - (speed * 50)); // Percentage between start showing until disappearing

      el.style.setProperty(this.positionVarName, `${position.toFixed(2)}%`);
    }
  }

  private getTopCoord(elem: HTMLElement): number {
    return elem.getBoundingClientRect().top + pageYOffset;
  }
}
