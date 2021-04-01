import React from 'react';
import LibrarySong from './LibrarySong';

const Library = props => {
  return (
    <div className={`library ${props.libraryStatus ? 'selected-library' : ''}`}>
      <h2>Library</h2>
      <div>
        {props.songs.map(song => {
          return (
            <LibrarySong
              song={song}
              setCurrentSong={props.setCurrentSong}
              songs={props.songs}
              audioRef={props.audioRef}
              isPlaying={props.isPlaying}
              setSongs={props.setSongs}
              key={song.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
