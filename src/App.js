import React, { useState, useEffect, useRef } from 'react';
import { usePalette } from 'color-thief-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import Player from './components/Player';
import ProfileIcon from './components/ProfileIcon';
import { fetchSongs } from './utils/api';
import './styles/index.css';
import './components/ProfileIcon.css';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [activeTab, setActiveTab] = useState('for-you');
  const [backgroundGradient, setBackgroundGradient] = useState('');
  const audioRef = useRef(null);

  const { data: colorPalette } = usePalette(
    currentSong ? `https://cms.samespace.com/assets/${currentSong.cover}` : null,
    5,
    'hex',
    { crossOrigin: 'anonymous', quality: 10 }
  );

  useEffect(() => {
    if (colorPalette) {
      const gradient = `linear-gradient(135deg, ${colorPalette[0]}, ${colorPalette[1]}, ${colorPalette[2]})`;
      setBackgroundGradient(gradient);
    }
  }, [colorPalette]);

  useEffect(() => {
    const loadSongs = async () => {
      const fetchedSongs = await fetchSongs();
      setSongs(fetchedSongs);
      setFilteredSongs(fetchedSongs);
      calculateDurations(fetchedSongs);
    };
    loadSongs();
  }, []);

  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const calculateDurations = async (songsToCalculate) => {
    const updatedSongs = await Promise.all(
      songsToCalculate.map(async (song) => {
        return new Promise((resolve) => {
          const audio = new Audio(song.url);
          audio.addEventListener('loadedmetadata', () => {
            resolve({ ...song, duration: audio.duration });
          });
          audio.addEventListener('error', () => {
            resolve({ ...song, duration: 0 });
          });
        });
      })
    );
    setSongs(updatedSongs);
    setFilteredSongs(updatedSongs);
  };

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
    <div className="container" style={{ background: backgroundGradient }}>
      <div className="left-panel">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar onSearch={handleSearch} />
        <SongList
          songs={filteredSongs}
          currentSong={currentSong}
          onSongSelect={handleSongSelect}
        />
        <ProfileIcon />
      </div>
      <div className="right-panel">
        <Player
          currentSong={currentSong}
          onNext={handleNext}
          onPrevious={handlePrevious}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default App;
