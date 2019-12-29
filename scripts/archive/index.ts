import '../../styles/archive/archive/block-1.less';
import '../styles/archive/block-2.less';
import '../styles/archive/block-3.less';
import '../styles/archive/block-4.less';
import '../styles/archive/block-5.less';
import '../styles/archive/block-6.less';
import '../styles/archive/block-7.less';
import '../styles/archive/block-8.less';
import '../styles/archive/block-9.less';
import '../styles/archive/lazy.less';
import '../styles/archive/main.less';
import '../styles/modal.less';
import '../styles/archive/parallax.less';
import '../styles/archive/slider.less';
import {BgVideo} from "./bg-video";
import {LazyLoading} from "./lazy-loading";
import {LazyShowing} from "./lazy-showing";
import {Modal} from "../modal";
import {Parallax} from "./parallax";

import {Slider} from "./slider";
import {SubscribeModal} from "./subscribe-modal";


const slider1 = new Slider('.b1-slider');
const slider3 = new Slider('.b3-slider');
const slider4 = new Slider('.b4-slider');
const slider5 = new Slider('.b8-slider', {interval: 6000});

new LazyLoading();
new Parallax();
new SubscribeModal('subscription-modal');
new Modal('video-modal');
new LazyShowing();
new BgVideo({id: 'bg-video', videoId: 'nVh-3IIT6zw'});
