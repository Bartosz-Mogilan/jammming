import React from "react";
import Track from "../Track/Track.js"
import styles from "../../css/Tracklist.module.css";

function Tracklist ({tracks, addTrackToPlaylist, removeTrackFromPlaylist}) {
    return (
        <div className={styles.Tracklist}>
            {Array.isArray(tracks) && tracks.map(track => (
                <Track 
                uri={track.uri}
                key={track.id}
                id={track.id}
                name={track.name}
                artist={track.artist}
                album={track.album}
                addTrackToPlaylist={addTrackToPlaylist}
                removeTrackFromPlaylist={removeTrackFromPlaylist}
                />
            ))}
        </div>
    );
}

export default Tracklist;