import { useState, useEffect } from 'react';
interface Album {
    id: string;
    name: string;
    url: string;
  }
  
  interface Image {
    quality: string;
    link: string;
  }
  
  interface Song {
    id: string;
    name: string;
    album: Album;
    year: string;
    releaseDate: string;
    duration: string; // You might want to change this to number if appropriate
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number; // You might want to change this to boolean if appropriate
    playCount: string; // You might want to change this to number if appropriate
    language: string;
    hasLyrics: string; // You might want to change this to boolean if appropriate
    url: string;
    copyright: string;
    image: Image[];
    downloadUrl: { quality: string; link: string }[];
  }
  
  interface AlbumData {
    id: string;
    name: string;
    year: string;
    releaseDate: string;
    songCount: string; // You might want to change this to number if appropriate
    url: string;
    primaryArtistsId: string;
    primaryArtists: string;
    featuredArtists: string[];
    artists: string[]; // You might want to change this to an appropriate type if needed
    image: Image[];
    songs: Song[];
  }
  
  interface ApiResponse {
    status: string;
    message: null;
    data: AlbumData;
  }
  


const useAlbumDetails = (artistLink: string) => {
    const [data, setData] = useState<AlbumData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://saavan-music-api.vercel.app/artists?link=${artistLink}`);
                const data = await response.json() as ApiResponse
                setData(data.data??[]);
                setLoading(false);
            } catch (err) {
                setError(err + 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [artistLink]);

    return { data, loading, error };
};

export default useAlbumDetails;
