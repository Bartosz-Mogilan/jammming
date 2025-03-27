# Jammming

Jammming is a React-based web application that integrates with the Spotify API, allowing users to search for songs, create and update multiple playlists, and save them directly to their Spotify account.

## Features

- **Spotify Integration:**  
  Authenticate with Spotify and interact with its API to search tracks, create new playlists, update existing playlists, and retrieve user playlists.

- **Multiple Playlists Support:**  
  - Display a list of the current user's playlists.
  - Select a playlist to load its name and tracks.
  - Update the playlist’s name and tracks, then save changes back to Spotify.
  - Warn users about unsaved changes when switching playlists.

- **Track Search and Filtering:**  
  - Search for songs, albums, or artists using the Spotify API.
  - Only display search results for tracks not already present in the current playlist.

- **Preview Samples:**  
  Preview a sample of tracks (if available) using the built-in HTML5 audio player.

- **Access Token Management:**  
  Precise handling of the Spotify access token with automatic expiration management.

- **Search Term Persistence:**  
  Restore the search term after authentication redirection using local storage.
