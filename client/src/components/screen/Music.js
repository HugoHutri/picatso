import React from "react";
import sound from "../../audio/bensound-funnysong.mp3";

class Music extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    this.audio = null;
    this.onClickAudio = this.onClickAudio.bind(this);
  }

  componentDidMount() {
    this.audio.volume = 0.0;
  }

  componentDidUpdate() {
    if (this.audio) this.audio.play();
  }

  onClickAudio() {
    this.audio.volume = this.audio.volume ? 0 : 0.2;
    this.forceUpdate();
  }

  render() {
    const audioStyle = {
      fontSize: "45px",
      textShadow: "2px 2px 4px black",
      position: "fixed",
      top: "10px",
      right: "10px"
    };
    return (
      <div>
        <i
          style={audioStyle}
          onClick={this.onClickAudio}
          className="material-icons white-text"
        >
          {this.audio && this.audio.volume ? "music_note" : "music_off"}
        </i>
        <audio
          ref={el => (this.audio = el)}
          id="myaudio"
          src={sound}
          loop
        ></audio>
      </div>
    );
  }
}

export default Music;
