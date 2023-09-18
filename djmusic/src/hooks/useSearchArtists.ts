

interface Image {
    quality: string;
    link: string;
  }
  
  export interface Artist {
    id: string;
    name: string;
    url: string;
    role: string;
    image: Image[];
    isRadioPresent: boolean;
  }
  
  interface Data {
    total: number;
    start: number;
    results: Artist[];
  }
  
  interface ApiResponse {
    status: string;
    message: null;
    data: Data;
  }
  

import { useState, useEffect } from 'react';

const useSearchArtists = ( query: string ) => {
    const [data, setData] = useState<Artist[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Replace with your API fetch logic
            const response = await fetch(`https://saavan-music-api.vercel.app/search/artists?query=${query}&page=${page}&limit=10`);
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

export default useSearchArtists;
