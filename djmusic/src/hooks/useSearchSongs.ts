// useSearchSongs.js

interface Album {
    id: string;
    name: string;
    url: string;
}

interface Image {
    quality: string;
    link: string;
}

interface DownloadUrl {
    quality: string;
    link: string;
}

export interface Song {
    id: string;
    name: string;
    album: Album;
    year: string;
    releaseDate: string | null;
    duration: string;
    label: string;
    primaryArtists: string;
    primaryArtistsId: string;
    featuredArtists: string;
    featuredArtistsId: string;
    explicitContent: number;
    playCount: string;
    language: string;
    hasLyrics: string;
    url: string;
    copyright: string;
    image: Image[];
    downloadUrl: DownloadUrl[];
}

interface SearchResultData {
    total: number;
    start: number;
    results: Song[];
}

interface SearchResultsResponse {
    status: string;
    message: null | string;
    data: SearchResultData;
}


import { useState, useEffect } from 'react';

const useSearchSongs = ( query: string ) => {
    const [data, setData] = useState<SearchResultData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Replace with your API fetch logic
            const response = await fetch(`https://saavan-music-api.vercel.app/search/songs?query=${query}&page=${page}&limit=10`);
            const result = await response.json();
            // let data  = result.data as 
            // console.log(result.data)
            setData({ results: [...data?.results ?? [], ...result.data.results], start: data?.start ?? 1, total: data?.results.length ?? 0 + result.data.results.length });
        } catch (err) {
            console.log(err)
            setError('Some error occures' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log("load more "+ page)
    }, [page]);

    const loadMore = () => {
        setPage(page + 1);
    };

    return { data, loading, error, loadMore };
};

export default useSearchSongs;
