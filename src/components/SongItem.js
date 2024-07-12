import React from 'react';

const SongItem = ({ song, isActive, onSelect }) => {
  return (
    <div
      className={`song-item ${isActive ? 'active' : ''}`}
      onClick={onSelect}
    >
      <img
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.name}
      />
      <div className="song-info">
        <h3>{song.name}</h3>
        <p>{song.artist}</p>
      </div>
      <span className="duration">{song.duration}</span>
    </div>
  );
};

export default SongItem;