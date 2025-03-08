import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/Track.module.css";

function Track({id, name, artist, album, uri, preview_url, addTrackToPlaylist, removeTrackFromPlaylist, isRemoval }) {

    const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
    const audioRef = useRef(null);

    console.log(`Track: ${name}, Preview URL: ${preview_url}`);

    const togglePreview = () => {
        if (!preview_url || !audioRef.current) return;
        if(!isPreviewPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error);
            });
            setIsPreviewPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPreviewPlaying(false);
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if(audioElement) {
            const handleEnded = () => setIsPreviewPlaying(false);
            audioElement.addEventListener("ended", handleEnded);
            return () => {
                audioElement.removeEventListener("ended", handleEnded);
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
      <div className={styles.previewContainer}>
        {preview_url ? (
          <>
            <button onClick={togglePreview} className={styles.previewButton} disabled={!preview_url}>
              {preview_url ? (isPreviewPlaying ? "Pause Preview" : "Play Preview") : "No Preview Available"}
            </button>
            {preview_url && <audio ref={audioRef} src={preview_url} style={{ display: "none" }} />}
          </>
        ) : (
          <button className={styles.previewButton} disabled>
            No Preview
          </button>
        )}
      </div>
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

