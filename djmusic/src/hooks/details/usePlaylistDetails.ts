import { useState, useEffect } from 'react';
 
interface Image {
    quality: string;
    link: string;
  }
  
  interface Album {
    id: string;
    name: string;
    url: string;
  }
  
  interface Song {
    id: string;
    name: string;
    album: Album;
    year: string;
    releaseDate: string;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: string; // Note: You might want to change this to a number if appropriate
    language: string;
    hasLyrics: string; // Note: You might want to change this to a boolean if appropriate
    url: string;
    copyright: string;
    image: Image[];
    downloadUrl: Image[];
  }
  
  interface FeaturedListData {
    id: string;
    userId: string;
    name: string;
    followerCount: string; // Note: You might want to change this to a number if appropriate
    songCount: string; // Note: You might want to change this to a number if appropriate
    fanCount: string; // Note: You might want to change this to a number if appropriate
    username: string;
    firstname: string;
    lastname: string;
    shares: string; // Note: You might want to change this to a number if appropriate
    image: Image[];
    url: string;
    songs: Song[];
  }
  
  interface ApiResponse {
    status: string;
    message: null;
    data: FeaturedListData;
  }
  

const usePlaylistsDetails = (playlistId: string) => {
    const [data, setData] = useState<FeaturedListData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://saavan-music-api.vercel.app/playlists?id=${playlistId}`);
                const data = await response.json() as ApiResponse
                setData(data.data);
                setLoading(false);
            } catch (err) {
                setError(err + 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [playlistId]);

    return { data, loading, error };
};

export default usePlaylistsDetails;
