import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist.js";
import styles from "../../css/Playlist.module.css"

function Playlist({name, tracks, removeTrackFromPlaylist, setPlaylistName, savePlaylist}) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setPlaylistName(newName);
    };

    const handleKeyPress =(e) => {
        if(e.key === "Enter") {
            setIsEditing(false);
            setPlaylistName(newName);
        }
    };

async function handleSavePlaylist() {
    if(!Array.isArray(tracks) || tracks.length === 0) {
        console.log("No valid tracks avaiable for saving:", tracks);
        return;
    }
    try {
        await savePlaylist();
        console.log("Tracks saved successfully");
    } catch(error) {
        console.error("Error saving plylist.", error);
    }    
}


    return (
        <div className={styles.playlistContainer}>
            <div className={styles.playlistBox}>
            {isEditing ? (
                <input 
                className={styles.playlistNameInput}
                type="text"
                value={newName}
                onChange={handleNameChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                autoFocus
                />
            ) : (
                <h2 className={styles.playlistName} onClick={() => setIsEditing(true)}>
                    {name}
                </h2>
            )}
            <Tracklist tracks={tracks} removeTrackFromPlaylist={removeTrackFromPlaylist} isRemoval={true} />
            {tracks.length > 0 && (
                <button className={styles.saveButton} onClick={handleSavePlaylist}>
                    Save to Spotify
                </button>
            )}
            </div>
        </div>
    );
}

export default Playlist;