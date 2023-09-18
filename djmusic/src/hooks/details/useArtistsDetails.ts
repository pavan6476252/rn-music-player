import { useState, useEffect } from 'react';
interface Image {
    quality: string;
    link: string;
  }
  
  interface ArtistData {
    id: string;
    name: string;
    url: string;
    image: Image[];
    followerCount: string; // Note: You might want to change this to a number if appropriate
    fanCount: string; // Note: You might want to change this to a number if appropriate
    isVerified: boolean;
    dominantLanguage: string;
    dominantType: string;
    bio: any[]; // Change this to an appropriate type if bio has structured data
    dob: string;
    fb: string;
    twitter: string;
    wiki: string;
    availableLanguages: string[];
    isRadioPresent: boolean;
  }
  
  interface ApiResponse {
    status: string;
    message: null;
    data: ArtistData;
  }
  

const useArtistDetails = (artistLink: string) => {
    const [data, setData] = useState<ArtistData>();
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

export default useArtistDetails;
