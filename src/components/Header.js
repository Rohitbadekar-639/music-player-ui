import React from 'react';
import { FaSpotify } from 'react-icons/fa';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header>
      <div className="logo">
        <FaSpotify size={30} />
        <span>Spotify</span>
      </div>
      <nav>
        <button
          className={activeTab === 'for-you' ? 'active' : ''}
          onClick={() => onTabChange('for-you')}
        >
          For You
        </button>
        <button
          className={activeTab === 'top-tracks' ? 'active' : ''}
          onClick={() => onTabChange('top-tracks')}
        >
          Top Tracks
        </button>
      </nav>
    </header>
  );
};

export default Header;