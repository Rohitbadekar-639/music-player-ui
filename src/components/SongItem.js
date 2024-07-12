import React from 'react';

const SongItem = ({ song, isActive, onSelect }) => {
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
      <span className="duration">{formatDuration(song.duration || 0)}</span>
    </div>
  );
};

export default SongItem;