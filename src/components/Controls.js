import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';

const Controls = ({ isPlaying, onPlay, onNext, onPrevious, volume, onVolumeChange }) => {
  return (
    <div className="controls">
      <button onClick={onPrevious}>
        <FaStepBackward />
      </button>
      <button onClick={onPlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={onNext}>
        <FaStepForward />
      </button>
      <div className="volume-control">
        <FaVolumeUp />
      </div>
    </div>
  );
};

export default Controls;