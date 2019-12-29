import {getCollection, WinPositions} from "../helpers";
import {ScrollHelper} from "./scroll-helper";

const scrollHelper = new ScrollHelper();

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
    getCollection(selector).forEach((el: HTMLImageElement) => {
      this.items.push({el, src: el.dataset.src, bg: el.dataset.bg});
    });
    this.init();
  }

  init() {
    scrollHelper.subscribe(this.handleScroll);
  }

  handleScroll = (winPos: WinPositions) => {
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.loadItem(this.items[i], winPos)
    }
    if (!this.items.length) scrollHelper.unsubscribe(this.handleScroll);
  };

  loadItem(item: imgItem, winPos: WinPositions) {
    const el = item.el;
    const imgY = scrollHelper.getTopCoord(el);
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
}
