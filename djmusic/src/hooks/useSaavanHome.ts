import { useState, useEffect } from 'react';

type ApiResponse = {
  status: string;
  message: string | null;
  data: {
    albums: Album[];
    playlists: Playlist[];
    charts: Chart[];
    trending: {
      songs: Song[];
      albums: Album[];
    };
  };
};

type Album = {
  id: string;
  name: string;
  year: string;
  type: string;
  playCount: string;
  language: string;
  explicitContent: string;
  songCount: string;
  url: string;
  primaryArtists: any[];
  featuredArtists: any[];
  artists: Artist[];
  image: Image[];
  songs: any[];
};

type Playlist = {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  type: string;
  image: Image[];
  url: string;
  songCount: string;
  firstname: string;
  followerCount: string;
  lastUpdated: string;
  explicitContent: string;
};

type Chart = {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: Image[];
  url: string;
  firstname: string;
  explicitContent: string;
  language: string;
};

type Song = {
  id: string;
  name: string;
  type: string;
  album: {
    id: string;
    name: string;
    url: string;
  };
  year: string;
  releaseDate: string;
  duration: string;
  label: string;
  primaryArtists: Artist[];
  featuredArtists: any[];
  explicitContent: string;
  playCount: string;
  language: string;
  url: string;
  image: Image[];
};

type Artist = {
  id: string;
  name: string;
  url: string;
  image: Image[] | false;
  type: string;
  role: string;
};

type Image = {
  quality: string;
  link: string;
};

const useSaavnApi = (languages: string[]) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `https://saavn.me/modules?language=${languages.join(',')}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [languages]);

  return { data, loading, error };
};

export default useSaavnApi;
