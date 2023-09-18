interface Image {
    quality: string;
    link: string;
  }
  
 export  interface Result {
    id: string;
    userId: string;
    name: string;
    songCount: string;
    username: string;
    firstname: string;
    lastname: string;
    language: string;
    image: Image[];
    url: string;
    songs: any[]; // You can replace this with a specific type if needed
  }
  
  interface Data {
    total: number;
    start: number;
    results: Result[];
  }
  
  interface ApiResponse {
    status: string;
    message: null;
    data: Data;
  }
  



import { useState, useEffect } from 'react';

const useSearchPlaylists = ( query: string ) => {
    const [data, setData] = useState<Result[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [page, setPage] = useState<number>(1);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Replace with your API fetch logic
            const response = await fetch(`https://saavan-music-api.vercel.app/search/playlists?query=${query}&page=${page}&limit=10`);
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

export default useSearchPlaylists;
