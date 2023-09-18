import { useEffect, useState } from 'react';

interface LyricsData {
  status: string;
  message: null | string;
  data: {
    lyrics: string;
    snippet: string;
    copyright: string;
  };
}

const useSongLyrics = (songId: string) => {
  const [lyricsData, setLyricsData] = useState<LyricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongLyrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://saavn.me/lyrics?id=${songId}`);
        const data = await response.json();
        
        if (data.status === 'SUCCESS') {
          setLyricsData(data);
        } else {
          setError('Lyrics not found.');
        }
      } catch (error) {
        setError('Error fetching lyrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchSongLyrics();
  }, [songId]);

  return { lyricsData, loading, error };
};

export default useSongLyrics;
