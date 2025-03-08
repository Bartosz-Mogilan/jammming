const clientId = "2d9c97aa165e4a2d8882120368eb04fb";
const redirectUri = "http://localhost:3000/";
let accessToken;
let expiresIn;


//Getting the access token from spotify

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("Access token obtained", accessToken);
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20playlist-read-private%20user-read-private&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = accessUrl;
    }
  },

  //Getting the current User

  async getCurrentUserId() {
    const token = this.getAccessToken();
    console.log("Using token for getCurrentUser:", token);

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: { 
        Authorization: `Bearer ${token}`
      },
    });
    console.log("Response status for getCurrentUserId:", response.status);
    if(!response.ok) {
      console.log("Error details:", await response.text())
      throw new Error("Failed to fetch ID");
    }
    const data = await response.json();
    return data.id;
  },

  //Getting User playlists 

  async getUserPlaylists() {
    const userId = await this.getCurrentUserId();
    const token = this.getAccessToken();
    console.log("Using toekn for getUserPlaylist:", token);

    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`, // changed from this.getAccessToToken incase something does not work
      },
    });
  console.log("Response status for getUserPlaylists:", response.status);
    if (!response.ok) {
      throw new Error("Failed to fetch user playlists");
    }

    const data = await response.json();
    return data.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name
    }));
  },

//Getting tracks in a playlist
  async getPlaylist(id) {
    const token = this.getAccessToken();
    console.log("Using token for getPlaylist:", token);

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
 console.log("Response status for getPlaylist:", response.status);
    if (!response.ok) {
      console.log("Error details:", await response.text());
      throw new Error("Could not fetch playlist tracks");
    }

    const data = await response.json();
    return data.items.map(item => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map(artist => artist.name).join(", "), 
      album: item.track.album.name,
      uri: item.track.uri,
    }));
  },


  // Saving the playlist

  async savePlaylist(playlistName, trackURIs, id = null) {
    const token = this.getAccessToken();
    if (!token) {
      alert('Spotify access token is missing! Please log in again.');
      return;
    }

    if (!playlistName || !trackURIs.length) {
      alert('Playlist name or track URIs are missing.');
      return;
    }

    try {
      const userId = await this.getCurrentUserId();
      let playlistId = id;

      if (id) {
        await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: playlistName}),
        });
        playlistId = id;
      } else {
        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            public: true,
          }),
        });

        if (!createPlaylistResponse.ok) {
          console.log("Error creating playlist:", await createPlaylistResponse.text());
          throw new Error("Failed to create playlist");
        }

        const playlistData = await createPlaylistResponse.json();
        playlistId = playlistData.id;
      }

      //Adding tracks to the playlist 

      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: trackURIs }),
      });

      if (!addTracksResponse.ok) {
        console.log("Error adding tracks", await addTracksResponse.text());
        throw new Error("Failed to add tracks to playlist");
      }

      alert('Playlist saved successfully!');

    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist. Please try again.');
    }
  },

  // Searching for tracks by query

  async searchTracks(query) {
    const token = await this.getAccessToken();
    console.log("Searching for query", query);
    if (!token) {
      alert("Spotify access token missing. Please log in again.");
      return [];
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      
      const data = await response.json();
      if(!data.tracks || !data.tracks.items) {
        console.error("No tracks found", data)
        return [];

      }

      if (!response.ok) {
        console.log("Error details:", await response.text());
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }

       return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(", "),
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (error) {
      console.error("Error searching tracks:", error);
      return []; 
    }
    
    }
};

 
export default Spotify;


 