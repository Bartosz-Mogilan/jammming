import React from "react";
import styles from "../../css/Track.module.css";

function Track({id, name, artist, album, uri, preview_url, addTrackToPlaylist, removeTrackFromPlaylist,}) {

const handleAddTrack = () => {
    if(typeof addTrackToPlaylist === "function") {
        addTrackToPlaylist({id, name, artist, album, uri, preview_url});
    } else {
        console.error('addTrackToPlaylist is not a function')
    }
};

const handleRemoveTrack = () => {
    if (removeTrackFromPlaylist) {
        removeTrackFromPlaylist({id, name, artist, album, uri});
    }
};

return (
        <div className={styles.Track}>
            <div className={styles.trackDetails}> 
            <h3>{name}</h3>
            <p>{artist}</p>
            <p>{album}</p>
            {preview_url && (
                <audio controls>
                    <source src={preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element
                </audio>
            )}
            {removeTrackFromPlaylist ? (
                <button className={styles.removeButton} onClick={handleRemoveTrack}>
                    Remove
                </button>
            ) : (
                <button className={styles.addButton} onClick={handleAddTrack}>
                Add to Playlist
            </button>
            )}
            </div>
        </div>
        )
}

export default Track;