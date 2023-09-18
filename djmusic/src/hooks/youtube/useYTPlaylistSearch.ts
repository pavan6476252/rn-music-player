export interface YTPlaylist {
    playlistId: string;
    title: string;
    totalSongs: number;
    thumbnailUrl: string;
  }
  

  import { useEffect, useState } from 'react';


  const usePlaylistSearch = (query: string) => {
    // State to store the search results
    const [playlists, setPlaylists] = useState<YTPlaylist[]>([]);
    // State to track loading status
    const [loading, setLoading] = useState<boolean>(false);
    // State to track errors, if any
    const [error, setError] = useState('');
  
    // Function to fetch playlist data based on the query
    const searchPlaylists = async () => {
      setLoading(true);
      try {
        // Make the API request
        const response = await fetch(
          `https://node-yt-music-yx.vercel.app/api/search/playlists?q=${query}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        const data = await response.json();
        setPlaylists(data);
        // setError(null);
      } catch (err) {
        setError(err + 'in yt playlist hook');
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch playlists when the query changes
    useEffect(() => {
      if (query.trim() !== '') {
        searchPlaylists();
      } else {
        // Clear the playlists when the query is empty
        setPlaylists([]);
      }
    }, [query]);
  
    return { playlists, loading, error };
  };
  
  export default usePlaylistSearch;
  