import React from 'react';

const LibrarySong = props => {
  const selectCurrentSongHandler = async () => {
    const selectedSong = props.songs.filter(
      stateSong => stateSong.id === props.song.id
    );
    await props.setCurrentSong(selectedSong[0]);
    // if (props.isPlaying) {
    //   const playingPromise = props.audioRef.current.play();
    //   if (playingPromise !== undefined) {
    //     playingPromise.then(() => {
    //       props.audioRef.current.play();
    //     });
    //   }
    // }
    if (props.isPlaying) {
      props.audioRef.current.play();
    }
    const newSong = props.songs.map(song => {
      if (song.id === props.song.id) {
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

  return (
    <div
      onClick={selectCurrentSongHandler}
      className={`library-song ${props.song.active ? 'selected' : ''}`}
    >
      <img src={props.song.cover} alt={props.song.name} />
      <div className="song-description">
        <h3>{props.song.name}</h3>
        <h4>{props.song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
