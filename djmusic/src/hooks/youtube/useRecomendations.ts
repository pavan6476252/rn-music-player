import { useEffect, useState } from 'react';

export interface YouTubeMusicCard {
  youtubeId: string;
  title: string;
  artists: {
    name: string;
    id?: string;
  }[];
  isExplicit: boolean;
  album: string;
  thumbnailUrl: string;
  duration: {
    label: string;
    totalSeconds: number;
  };
}

export function useYouTubeMusicData(apiUrl: string) {
  const [data, setData] = useState<YouTubeMusicCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl]);

  return { data, loading };
}
