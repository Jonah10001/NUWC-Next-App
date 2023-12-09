import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
  gameid: string;
  tournamentid: string;
  hometeam: string;
  awayteam: string;
  homescore: string;
  awayscore: string;
  starttime: string;
  round: string;
}

interface ScheduleProps {
  tournamentid: string;
}

const Schedule: React.FC<ScheduleProps> = ({ tournamentid }) => {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
          try {
            // console.log("tournament id");
            // console.log(tournamentid);
            if (tournamentid) {
              const response = await axios.get<Game[]>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/games/${tournamentid}`);
            //   console.log("response");
            //   console.log(response.data);
              setGames(response.data);
            }
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTeams();
      }, [tournamentid]);
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <div><p>Error {error}</p></div>;
      }

    return (
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
            <tr className="bg-gray-100">
            <th className="py-3 px-6 border-b text-center">Game ID</th>
            <th className="py-3 px-6 border-b text-center">Tournament ID</th>
            <th className="py-3 px-6 border-b text-center">Home Team</th>
            <th className="py-3 px-6 border-b text-center">Away Team</th>
            <th className="py-3 px-6 border-b text-center">Home Score</th>
            <th className="py-3 px-6 border-b text-center">Away Score</th>
            <th className="py-3 px-6 border-b text-center">Start Time</th>
            <th className="py-3 px-6 border-b text-center">Round</th>
            </tr>
        </thead>
        <tbody>
            {games && games.map((game, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-6 border-b text-center">{game.gameid}</td>
                <td className="py-2 px-6 border-b text-center">{game.tournamentid}</td>
                <td className="py-2 px-6 border-b text-center">{game.hometeam}</td>
                <td className="py-2 px-6 border-b text-center">{game.awayteam}</td>
                <td className="py-2 px-6 border-b text-center">{game.homescore}</td>
                <td className="py-2 px-6 border-b text-center">{game.awayscore}</td>
                <td className="py-2 px-6 border-b text-center">{game.starttime}</td>
                <td className="py-2 px-6 border-b text-center">{game.round}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default Schedule;