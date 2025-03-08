import { useState, useEffect } from "react";
import React from "react";
import SearchBar from "../Components/SearchBar/SearchBar";
import SearchResults from "../Components/SearchResults/SearchResults";
import PlayList from "../Components/Playlist/Playlist";
import styles from "../../src/css/App.module.css";
import Spotify from "../Components/Spotify/spotify";
import PlaylistList from "../Components/PlaylistList/PlaylistList";


function App() {
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("SearchTerm") || ""
  );

  const onSearchResults = (searchResults) => {
    const filteredResults = searchResults.filter((track) => !playlistTracks.some((savedTrack) => savedTrack.id === track.id));
    setTracks(filteredResults);
  };

  const handleSearchSubmit = async (term) => {
    setSearchTerm(term);
    localStorage.setItem("SearchTerm", term);
    try {
      const result = await Spotify.searchTracks(term);
      onSearchResults(result)
    } catch (error) {
      console.error("Error searching for tracks", error);
    }
  };

  const addTrackToPlaylist = (track) => {
    setPlaylistTracks((prevTracks) => {
      if(prevTracks.some((savedTrack) => savedTrack.id === track.id)) {
        return prevTracks;
      }
      return [...prevTracks, track];
    });
  };

const removeTrackFromPlaylist = (track) => {
  setPlaylistTracks((prevTracks) => prevTracks.filter((t) => t.id !== track.id));
};

const savePlaylist = async() => {
  const uris = playlistTracks.map((track) => track.uri);
  setIsLoading(true);
try {
  await Spotify.savePlaylist(playlistName, uris, playlistId);
  setPlaylistTracks([]);
  setPlaylistId(null);
} catch(error) {
  console.error("Error saving playlist", error);
} finally {
  setIsLoading(false);
 }
};

const selectPlaylist = async (id) => {
  try {
  const fetchedTracks = await Spotify.getPlaylist(id);
  const playlistDetails = await Spotify.getUserPlaylists();
  const selectedPlaylist = playlistDetails.find(
    (playlist) => playlist.id === id
  );
  setPlaylistName(selectedPlaylist.name);
  setPlaylistTracks(fetchedTracks)
  setPlaylistId(id)
  } catch(error) {
    console.error("Error selecting playlist", error);
  }
};

useEffect(() => {
  const storedSearchTerm = localStorage.getItem("SearchTerm");
  if(storedSearchTerm) {
    setSearchTerm(storedSearchTerm);
  }
}, []);


  return (
    <div className={styles.appContainer}>
      {isLoading && <div>Loading...</div>}
      <header className={styles.header}></header>
      <h1 className={styles.title}>Jammming</h1>
      <div className={styles.container}>
      <SearchBar onSearchResults={handleSearchSubmit} searchTerm={searchTerm}/>
      <div className={styles.content}>
        <div className={styles.resultsColumn}>
      <SearchResults tracks={tracks} addTrackToPlaylist={addTrackToPlaylist} />
      </div>

      <div className={styles.playlistColumn}>
      <PlaylistList onSelectPlaylist={selectPlaylist}/>
      <PlayList
      name={playlistName} 
      tracks={playlistTracks} 
      removeTrackFromPlaylist={removeTrackFromPlaylist} 
      setPlaylistName={setPlaylistName}
      savePlaylist={savePlaylist}
      />
      </div>
      </div>
    </div>
  </div>
  );
}

export default App;

