import React, { useState } from "react";
import styles from "../../css/SearchBar.module.css"
import Spotify from "../Spotify/spotify";

function SearchBar({onSearchResults}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearchResults(value);
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if(!searchTerm.trim()) {
            alert("Please enter a search term");
            return;
        }
        try {
        const results = await Spotify.searchTracks(searchTerm);
        onSearchResults(results);
        } catch(error) {
            console.log("Error fetching search results", error);
            alert("Failed to fetch results. Please try again");
        }
    }

    
    return (
        <div className={styles.searchBarContainer}>
            <form className ={styles.searchForm} onSubmit={handleSearchSubmit}>
                <input
                className={styles.searchInput}
                type="text"
                placeholder="Enter a Song, Album or Artist"
                value={searchTerm}
                onChange={handleSearchChange}
                />
                <button className={styles.searchButton} type="submit">Search</button>
                
            </form>
            
        </div>
    );
}

export default SearchBar;