import React, { useState, useRef, useEffect } from 'react';
import Controls from './Controls';

const Player = ({ currentSong, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  }, [currentSong]);

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="player">
      {currentSong && (
        <>
          <img
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            alt={currentSong.name}
          />
          <h2>{currentSong.name}</h2>
          <p>{currentSong.artist}</p>
          <audio
            ref={audioRef}
            src={currentSong.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={onNext}
          />
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <Controls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </>
      )}
    </div>
  );
};

export default Player;