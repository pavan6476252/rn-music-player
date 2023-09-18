import { useEffect, useState } from 'react';

interface SearchResults {
  status: string;
  message: null | string;
  data: {
    topQuery: {
      results: SearchResult[];
    };
    songs: {
      results: SearchResult[];
    };
    albums: {
      results: SearchResult[];
    };
    artists: {
      results: SearchResult[];
    };
    playlists: {
      results: SearchResult[];
    };
  };
}

interface SearchResult {
  id: string;
  title: string;
  image: {
    quality: string;
    link: string;
  }[];
  url: string;
  type: string;
  description: string;
  position: number;
}

const useSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://saavan-music-api.vercel.app/search/all?query=${query}`);
        const data = await response.json();
        
        if (data.status === 'SUCCESS') {
          setSearchResults(data);
        } else {
          setError('No results found.');
        }
      } catch (error) { 
        setError('Error fetching search results.'+error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { searchResults, loading, error };
};

export default useSearch;
