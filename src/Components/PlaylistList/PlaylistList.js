import React, {useEffect, useState} from "react";
import Spotify from "../Spotify/spotify";
import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import styles from "../../css/PlaylistList.module.css"

function PlaylistList ({ onSelectPlaylist }) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const userPlaylists = await Spotify.getUserPlaylists();
                setPlaylists(userPlaylists);
            } catch(error) {
                console.error("Error fetching playlists", error);
            }
        };
        fetchPlaylists();
    }, []);

    return (
        <div className={styles.playlistListContainer}>
            <h2>Select Playlist</h2>
            {playlists.map((playlist) => (
                <PlaylistListItem 
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
                onSelectPlaylist={onSelectPlaylist}
                />
            ))}
        </div>
    );
}

export default PlaylistList;