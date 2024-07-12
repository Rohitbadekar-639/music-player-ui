import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Player from './components/Player';
import { fetchSongs } from './utils/api';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [activeTab, setActiveTab] = useState('for-you');

  useEffect(() => {
    const loadSongs = async () => {
      const fetchedSongs = await fetchSongs();
      setSongs(fetchedSongs);
      setFilteredSongs(fetchedSongs);
    };
    loadSongs();
  }, []);

  const handleSearch = (query) => {
    const filtered = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'top-tracks') {
      setFilteredSongs(songs.filter((song) => song.top_track));
    } else {
      setFilteredSongs(songs);
    }
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex((song) => song.id === currentSong.id);
    const nextSong = filteredSongs[(currentIndex + 1) % filteredSongs.length];
    setCurrentSong(nextSong);
  };

  const handlePrevious = () => {
    const currentIndex = filteredSongs.findIndex((song) => song.id === currentSong.id);
    const previousSong = filteredSongs[(currentIndex - 1 + filteredSongs.length) % filteredSongs.length];
    setCurrentSong(previousSong);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar onSearch={handleSearch} />
        <SongList
          songs={filteredSongs}
          currentSong={currentSong}
          onSongSelect={handleSongSelect}
        />
      </div>
      <div className="right-panel">
        <Player
          currentSong={currentSong}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default App;