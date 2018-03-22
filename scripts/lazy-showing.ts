import {getCollection, scrollHelper, WinPositions} from "./helpers";

export class LazyShowing {
  items = [];

  constructor(selector = '.animated') {
    getCollection(selector).forEach((el: HTMLImageElement) => {
      this.items.push({el, delay: +el.dataset.delay || 0});
    });
    this.init();
  }

  private init() {
    scrollHelper.subscribe(this.handleScroll);
  }

  private handleScroll = (winPos: WinPositions) => {
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.showItem(this.items[i], winPos)
    }
    if (!this.items.length) scrollHelper.unsubscribe(this.handleScroll);
  };

  showItem(item, winPos) {
    const el = item.el;
    const imgY = scrollHelper.getTopCoord(el);
    const imgH = el.offsetHeight;

    // If block is shown on screen
    if (winPos.winBottom > imgY && winPos.winY < imgY + imgH) {
      setTimeout(() => {
        el.classList.add('show');
      }, item.delay);
      this.items.splice(this.items.indexOf(item), 1);
    }
  }
}
