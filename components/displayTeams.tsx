import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Team {
  teamid: number;
  tournamentid: number;
  numplayers: number;
  teamname: number;
}

interface StandingsProps {
  tournamentid: string;
}

const Teams: React.FC<StandingsProps> = ({ tournamentid }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // console.log("tournament id");
        // console.log(tournamentid);
        if (tournamentid) {
          const response = await axios.get<Team[]>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/teams/${tournamentid}`);
        //   console.log("response");
        //   console.log(response.data);
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
          <th className="py-3 px-6 border-b text-center">Team Name</th>
          <th className="py-3 px-6 border-b text-center">Team ID</th>
          <th className="py-3 px-6 border-b text-center">Tournament ID</th>
          <th className="py-3 px-6 border-b text-center">Number of Players</th>
        </tr>
      </thead>
      <tbody>
        {teams && teams.map((team, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="py-2 px-6 border-b text-center">{team.teamname}</td>
            <td className="py-2 px-6 border-b text-center">{team.teamid}</td>
            <td className="py-2 px-6 border-b text-center">{team.tournamentid}</td>
            <td className="py-2 px-6 border-b text-center">{team.numplayers}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Teams;