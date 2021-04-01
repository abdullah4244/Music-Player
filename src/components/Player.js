// import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = props => {
  //Player's State
  // const [songInfo, setSongInfo] = useState({
  //   currentTime: 0,
  //   durationTime: 0,
  // });

  // const audioRef = useRef(null);

  const playSongHandler = () => {
    if (props.isPlaying) {
      props.audioRef.current.pause();
      props.setIsPlaying(!props.isPlaying);
    } else {
      props.audioRef.current.play();
      props.setIsPlaying(!props.isPlaying);
    }
  };

  // const timeUpdateHandler = e => {
  //   const current = e.target.currentTime;
  //   const duration = e.target.duration;
  //   setSongInfo({ ...songInfo, currentTime: current, durationTime: duration });
  // };

  const getTime = time => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = e => {
    props.audioRef.current.currentTime = e.target.value;
    props.setSongInfo({ ...props.songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async direction => {
    const currentIndex = props.songs.findIndex(
      stateSong => stateSong.id === props.currentSong.id
    );
    if (direction === 'skip-forward') {
      props.setCurrentSong(
        await props.songs[(currentIndex + 1) % props.songs.length]
      );
      activeLibraryHandler(
        props.songs[(currentIndex + 1) % props.songs.length]
      );
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % props.songs.length === -1) {
        await props.setCurrentSong(props.songs[props.songs.length - 1]);
        activeLibraryHandler(
          props.songs[(currentIndex - 1) % props.songs.length]
        );
        if (props.isPlaying) {
          props.audioRef.current.play();
        }
        return;
      }
      props.setCurrentSong(
        await props.songs[(currentIndex - 1) % props.songs.length]
      );
      activeLibraryHandler(
        props.songs[(currentIndex - 1) % props.songs.length]
      );
    }
    if (props.isPlaying) {
      props.audioRef.current.play();
    }
  };

  const activeLibraryHandler = prevNext => {
    const newSong = props.songs.map(song => {
      if (song.id === prevNext.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    props.setSongs(newSong);
  };

  const trackAnime = {
    transform: `translate(${props.songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(props.songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${props.currentSong.color[0]}, ${props.currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={props.songInfo.duration}
            value={props.songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnime} className="animate-track"></div>
        </div>
        <p>{getTime(props.songInfo.durationTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={props.isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      {/* <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={props.currentSong.audio}
      /> */}
    </div>
  );
};

export default Player;
