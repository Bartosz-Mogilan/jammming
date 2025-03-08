import React from "react";
import Track from "../Track/Track.js"
import styles from "../../css/Tracklist.module.css";

function Tracklist ({ tracks, addTrackToPlaylist, removeTrackFromPlaylist, isRemoval }) {
    return (
        <div className={styles.Tracklist}>
            {Array.isArray(tracks) && tracks.map((track) => (
                <Track 
                key={track.id}
                id={track.id}
                name={track.name}
                artist={track.artist}
                album={track.album}
                uri={track.uri}
                preview_url={track.preview_url}
                addTrackToPlaylist={addTrackToPlaylist}
                removeTrackFromPlaylist={removeTrackFromPlaylist}
                isRemoval={isRemoval}
                />
            ))}
        </div>
    );
}

export default Tracklist;