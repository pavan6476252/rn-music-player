// useSearchAlbums.js
type ApiResponse = {
  status: string;
  message: string | null;
  data: {
    total: number;
    start: number;
    results: Album[];
  };
};

export type Album = {
  id: string;
  name: string;
  year: string;
  playCount: string;
  language: string;
  explicitContent: string;
  songCount: string;
  url: string;
  primaryArtists: Artist[];
  featuredArtists: Artist[];
  artists: Artist[];
  image: Image[];
  songs: Song[];
};

type Artist = {
  id: string;
  name: string;
  url: string;
  image: boolean;
  type: string;
  role: string;
};

type Image = {
  quality: string;
  link: string;
};

type Song = {
  // Define properties for songs if needed in the future
};



import { useState, useEffect } from 'react';

const useSearchAlbums = ( query: string ) => {
    const [data, setData] = useState<Album[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Replace with your API fetch logic
            const response = await fetch(`https://saavan-music-api.vercel.app/search/albums?query=${query}&page=${page}&limit=10`);
            const result = await response.json()as ApiResponse;
            // let data  = result.data as 
            // console.log(result.data)
            setData([...data??[] ,...result.data.results ]);
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

export default useSearchAlbums;
