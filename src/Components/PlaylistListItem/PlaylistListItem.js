import React from "react";
import styles from "../../css/PlaylistListItem.module.css"

function PlaylistListItem({id, name, onSelectPlaylist}) {
    return (
        <div className={styles.playlistItem} onClick={() => onSelectPlaylist(id)}>
            <h3>{name}</h3>
        </div>
    );
}



export default PlaylistListItem;