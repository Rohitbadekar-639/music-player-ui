import React from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, currentSong, onSongSelect }) => {
  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          isActive={currentSong && currentSong.id === song.id}
          onSelect={() => onSongSelect(song)}
        />
      ))}
    </div>
  );
};

export default SongList;