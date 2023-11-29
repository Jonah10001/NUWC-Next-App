import { useRouter } from 'next/router';
import '../../app/globals.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Navbar} from '../../components/navbar';

const TournamentPage = () => {
    const router = useRouter();
    const { tournamentid } = router.query;
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
        try {
            console.log("tournament id");
            console.log(tournamentid);
            if (tournamentid !== undefined) {
                const response = await axios.get(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/games/${tournamentid}`);
                console.log("response");
                console.log(response.data);
                setGames(response.data);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };

        fetchGames();
    }, [tournamentid]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div><p>Error {error}</p></div>;
    }

  return (
    <div>
        <Navbar/>
        <div>
        <h1>Tournament Schedule</h1>
        <p>Tournament ID: {tournamentid}</p>
        {/* <p>Games: {games}</p> */}
        {/* Add the rest of your tournament details rendering here */}
        </div>
    </div>
  );
};

export default TournamentPage;