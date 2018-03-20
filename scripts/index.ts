import '../styles/main.less';
import '../styles/slider.less';
import '../styles/parallax.less';
import '../styles/lazy.less';
import '../styles/block-1.less';
import '../styles/block-2.less';
import '../styles/block-3.less';
import '../styles/block-4.less';
import '../styles/block-5.less';
import '../styles/block-6.less';
import '../styles/block-7.less';
import '../styles/block-8.less';
import '../styles/block-9.less';

import {Slider} from "./slider";
import {Parallax} from "./parallax";
import {LazyLoading} from "./lazy-loading";


const slider1 = new Slider('.b1-slider');
const slider3 = new Slider('.b3-slider');
const slider4 = new Slider('.b4-slider');

new LazyLoading();
new Parallax();
