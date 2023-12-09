import React, { useState, useEffect } from 'react';
import axios from 'axios';

type TeamStats = {
  gamesplayed: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goaldifferential: number;
};

type StandingsResponse = Record<string, TeamStats>;

interface StandingsProps {
  tournamentid: string;
}

const Standings: React.FC<StandingsProps> = ({ tournamentid }) => {
  const [teams, setTeams] = useState<StandingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log("tournament id");
        console.log(tournamentid);
        if (tournamentid) {
          const response = await axios.get<StandingsResponse>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/standings/${tournamentid}`);
          console.log("response");
          console.log(response.data);
          setTeams(response.data);
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
          <th className="py-3 px-6 border-b text-center">Team</th>
          <th className="py-3 px-6 border-b text-center">Games Played</th>
          <th className="py-3 px-6 border-b text-center">Wins</th>
          <th className="py-3 px-6 border-b text-center">Draws</th>
          <th className="py-3 px-6 border-b text-center">Losses</th>
          <th className="py-3 px-6 border-b text-center">Points</th>
          <th className="py-3 px-6 border-b text-center">Goal Differential</th>
        </tr>
      </thead>
      <tbody>
        {teams && Object.entries(teams).map(([teamName, teamStats], index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="py-2 px-6 border-b text-center">{teamName}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.gamesplayed}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.wins}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.draws}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.losses}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.points}</td>
            <td className="py-2 px-6 border-b text-center">{teamStats.goaldifferential}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Standings;
