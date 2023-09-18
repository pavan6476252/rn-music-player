import { useEffect, useState } from 'react';

export interface YTMusic {
    youtubeId: string;
    title: string;
    artists: { name: string; id?: string }[];
    album: string;
    thumbnailUrl: string;
    duration: { label: string; totalSeconds: number };
    isExplicit: boolean;
}

function useYTMusicSearch(q:string) {
    const [query, setQuery] = useState(q);
    const [musicData, setMusicData] = useState<YTMusic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://node-yt-music-yx.vercel.app/api/search/musics?q=dj%20telugu'
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: YTMusic[] = await response.json();
                setMusicData(data);
                setLoading(false);
            } catch (error) {
                setError(error + 'An error occurred in yt song search');
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    function refreshYtSongsSearch(q: string) {
        if (query !== q)
         setQuery(q)
    }
    return { musicData, loading, error, refreshYtSongsSearch };
}

export default useYTMusicSearch;
