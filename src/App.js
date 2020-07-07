import React, { Component } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import { easeInQuad } from 'tween-functions';
import imgs from './image';
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      play: true,
      songUrl: [
        'https://m8.music.126.net/20200707161445/79f53558e5f2dce2cf23c902c21ccd1e/ymusic/5847/20c3/6894/8443e9f00b796c046e122520976835ad.mp3',
        'https://m7.music.126.net/20200707145805/1310e12098e5ea81cd31347284cf3cb3/ymusic/0452/5652/030f/38cbdaa2e4a83be9137c4ee26fa08d3e.mp3',
        'https://m7.music.126.net/20200707151038/1cc7bc7eb607456c4437a602635c8b94/ymusic/7388/4959/15fe/c527fa6d0aee9373b53566ea76b6fa3e.mp3',
      ],
      songIndex: 0,
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    //   });
    // }, 100);
    this.Audio.addEventListener(
      'ended',
      () => {
        this.setState((prev) => ({
          songIndex: prev.songIndex === prev.songUrl.length - 1 ? 0 : prev.songIndex + 1,
        }));
      },
      false,
    );
  }

  afterChange = (index) => {
    // console.log(index)
  };

  songControl = () => {
    const { play } = this.state;
    if (play) {
      this.Audio.pause();
    } else {
      this.Audio.play();
    }

    this.setState({
      play: !play,
    });
  };

  render() {
    const { songUrl, play, songIndex } = this.state;
    return (
      <div className="root">
        <div className={`music ${play ? 'play' : ''}`} onClick={this.songControl}>
          <i className="iconfont icon-xintiao"></i>
          <audio ref={(ref) => (this.Audio = ref)} src={songUrl[songIndex]} autoPlay />
        </div>
        <Carousel className="space-carousel" swipeSpeed={8} vertical dots={false} easing={easeInQuad} afterChange={this.afterChange}>
          {imgs.map((val, index) => (
            <img
              src={val}
              alt=""
              key={index}
              style={{ width: '100%', height: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                // window.dispatchEvent(new Event('resize'));
                // this.setState({ imgHeight: 'auto' });
              }}
            />
          ))}
        </Carousel>
      </div>
    );
  }
}

export default App;
