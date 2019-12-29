export class BgVideo {
  player;
  ytPlayer: YT.Player;

  constructor(private options: { videoId: string, id: string }) {
    YouTube.autoLoadYouTubeAPI().then(() => {
      this.init();
    });
  }

  init() {
    this.ytPlayer = new window['YT'].Player(this.options.id, {
      videoId: this.options.videoId,
      width: innerWidth,
      playerVars: {
        controls: 0,
        autoplay: 1,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        rel: 0,
      },
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange
      }
    });
    this.player = document.getElementById(this.options.id);
    window.addEventListener('resize', () => this.resize())
  }

  onPlayerReady = (e) => {
    this.resize();
    e.target.mute();
    e.target.playVideo();
    this.player.style.opacity = 1;
  };

  onPlayerStateChange = (state) => {
    if (state.data === 0) { // video ended and repeat option is set true
      this.ytPlayer.seekTo(0, true); // restart
    }
  };

  resize() {
    const width = innerWidth;
    const height = innerHeight;
    const ratio = 16 / 9;

    // when screen aspect ratio differs from video, video must center and underlay one dimension
    if (width / ratio < height) { // if new video height < window height (gap underneath)
      const pWidth = Math.ceil(height * ratio); // get new player width
      // player width is greater, offset left; reset top
      this.player.width = pWidth;
      this.player.height = height;
      this.player.style.left = `${(width - pWidth) / 2}px`;
      this.player.style.top = 0;
    } else { // new video width < window width (gap to right)
      const pHeight = Math.ceil(width / ratio); // get new player height
      // player height is greater, offset top; reset left
      this.player.width = width;
      this.player.height = pHeight;
      this.player.style.left = 0;
      this.player.style.top = `${(height - pHeight) / 2}px`;
    }
  }
}


class YouTube {
  static _youtubeIframeAPIReady;

  static autoLoadYouTubeAPI() {
    if (!YouTube._youtubeIframeAPIReady!) {
      YouTube._youtubeIframeAPIReady = new Promise(resolve => {
        window['onYouTubeIframeAPIReady'] = () => {
          resolve();
        };

        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
      });
    }
    return YouTube._youtubeIframeAPIReady;
  }
}
