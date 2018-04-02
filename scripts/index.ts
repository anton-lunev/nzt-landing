import '../styles/main.less';
import '../styles/slider.less';
import '../styles/parallax.less';
import '../styles/lazy.less';
import '../styles/modal.less';
import '../styles/block-1.less';
import '../styles/block-2.less';
import '../styles/block-3.less';
import '../styles/block-4.less';
import '../styles/block-5.less';
import '../styles/block-6.less';
import '../styles/block-7.less';
import '../styles/block-8.less';
import '../styles/block-9.less';
import {LazyShowing} from "./lazy-showing";
import {Modal} from "./modal";

import {Slider} from "./slider";
import {Parallax} from "./parallax";
import {LazyLoading} from "./lazy-loading";


const slider1 = new Slider('.b1-slider');
const slider3 = new Slider('.b3-slider');
const slider4 = new Slider('.b4-slider');
const slider5 = new Slider('.b8-slider', {interval: 3000});

new LazyLoading();
new Parallax();
new Modal();
new LazyShowing();
