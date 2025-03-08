import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "../../css/SearchResults.module.css"

function SearchResults({ tracks =[], addTrackToPlaylist, removeTrackFromPlaylist }) {
    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            <Tracklist 
            tracks={tracks} 
            addTrackToPlaylist={addTrackToPlaylist} 
            removeTrackFromPlaylist={removeTrackFromPlaylist}
            isRemoval={false}
            />
        </div>
    );
}

export default SearchResults;