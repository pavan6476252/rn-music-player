import { useEffect, useState } from 'react';

export interface SearchSuggestions {
    suggestions: string[]
}

export function useSearchSuggestions() {
    const [data, setData] = useState<SearchSuggestions>();
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://python-music-server.vercel.app/suggestions?query=${query}`);
                const result: SearchSuggestions = {
                    suggestions: await response.json()
                }
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, [query]);

    function refresh(query: string) {
        setQuery(query);
    }

    return { data, loading, refresh };
}
