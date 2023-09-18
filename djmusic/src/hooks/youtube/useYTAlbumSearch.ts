
export interface YTAlbum {
    albumId: string;
    title: string;
    type: string;
    thumbnailUrl: string;
    artist: string;
    artistId: string;
    year: string;
    isExplicit: boolean;
  }
  

  import { useEffect, useState } from 'react';
  const useAlbumSearch = (query: string) => {
    // State to store the search results
    const [albums, setAlbums] = useState<YTAlbum[]>([]);
    // State to track loading status
    const [loading, setLoading] = useState<boolean>(false);
    // State to track errors, if any
    const [error, setError] = useState<string>('');
  
    // Function to fetch album data based on the query
    const searchAlbums = async () => {
      setLoading(true);
      try {
        // Make the API request
        const response = await fetch(
          `https://node-yt-music-yx.vercel.app/api/search/albums?q=${query}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        const data = await response.json();
        setAlbums(data);
        // setError("null");
      } catch (err) {
        setError(err+ 'error in yt album hook');
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch albums when the query changes
    useEffect(() => {
      if (query.trim() !== '') {
        searchAlbums();
      } else {
        // Clear the albums when the query is empty
        setAlbums([]);
      }
    }, [query]);
  
    return { albums, loading, error };
  };
  
  export default useAlbumSearch;
  