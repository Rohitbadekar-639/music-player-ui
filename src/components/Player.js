import React, { useState, useEffect, useCallback } from 'react';
import Controls from './Controls';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Player = ({ currentSong, onNext, onPrevious, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
  }, [audioRef]);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current.duration);
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', onNext);

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', onNext);
      };
    }
  }, [audioRef, handleTimeUpdate, handleLoadedMetadata, onNext]);

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error("Playback failed", error));
    }
  }, [currentSong, audioRef]);

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Playback failed", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;

    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="player">
      {currentSong && (
        <>
          <h2>{currentSong.name}</h2>
          <p>{currentSong.artist}</p>
          <img
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            alt={currentSong.name}
          />
          <div className="progress-container">
            <span className="time current">{formatTime(currentTime)}</span>
            <input
              type="range"
              className="progress-bar"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
            />
            <span className="time total">{formatTime(duration)}</span>
          </div>
          <div className="player-controls">
            <button className="more-options">•••</button>
            <div className="controls">
              <Controls
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onNext={onNext}
                onPrevious={onPrevious}
              />
              <div className="volume-control" onClick={handleMute}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
