import { useState, useEffect } from 'react';

interface Song {
    id: string;
    name: string;
    album: {
        id: string;
        name: string;
        url: string;
    };
    year: string;
    releaseDate: string;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: number;
    language: string;
    hasLyrics: string;
    url: string;
    copyright: string;
    image: {
        quality: string;
        link: string;
    }[];
    downloadUrl: {
        quality: string;
        link: string;
    }[];
}

interface ApiResponse {
    status: string;
    message: null | string;
    data: Song[];
}

const useSongDetails = (songId: string) => {
    const [data, setData] = useState<Song[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://saavan-music-api.vercel.app/songs?id=${songId}`);
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
    }, [songId]);

    return { data, loading, error };
};

export default useSongDetails;
