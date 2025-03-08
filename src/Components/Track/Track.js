import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/Track.module.css";

function Track({id, name, artist, album, uri, preview_url, addTrackToPlaylist, removeTrackFromPlaylist, isRemoval }) {

    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePreview = () => {
        if (!audioRef.current) return;
        if(!isPreviewPlaying) {
            audioRef.current.play();
            setIsPreviewPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPreviewPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if(audio) {
            const handleEnded = () => setIsPreviewPlaying(false);
            audio.addEventListener("ended", handleEnded);
            return () => {
                audio.removeEventListener("ended", handleEnded);
            };
        }
    }, []);

const handleAddTrack = () => {
    if(typeof addTrackToPlaylist === "function") {
        addTrackToPlaylist({ id, name, artist, album, uri, preview_url });
    } else {
        console.error('Error adding track to playlist')
    }
};

const handleRemoveTrack = () => {
    if (typeof removeTrackFromPlaylist === "function") {
        removeTrackFromPlaylist({ id, name, artist, album, uri, preview_url });
    } else {
        console.error("Error removing track from playlist")
    }
};


return (
        <div className={styles.Track}>
            <div className={styles.trackDetails}> 
            <h3>{name}</h3>
            <p>{artist}</p>
            <p>{album}</p>
            {preview_url && (
                <div className={styles.previewContainer}>
                    <button onClick={togglePreview} className={styles.previewButton}>
                        {isPreviewPlaying ? "Pause Preview" : "Play Preview"}
                    </button>
                    <audio ref={audioRef} src={preview_url} style={{ display: "none"}} />
                </div>
            )}
            {isRemoval ? (
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
    );
}

export default Track;

