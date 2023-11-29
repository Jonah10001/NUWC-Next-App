import React, { useState, useEffect } from "react";
import axios from "axios";
import {Navbar} from '../components/navbar';
import '../app/globals.css';


const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/tournaments");
        console.log("response");
        console.log(response.data);
        setTournaments(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div><p>Error {error}</p></div>;
  }

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center m-5 font-bold text-2xl">Tournaments</h1>
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b text-center">Tournament Name</th>
              <th className="py-3 px-6 border-b text-center">Tournament ID</th>
              <th className="py-3 px-6 border-b text-center">Date</th>
              <th className="py-3 px-6 border-b text-center">Run Time</th>
            </tr>
          </thead>
          <tbody>
            {tournaments && tournaments.map((tournament, index) => (
              <tr key={index} onClick={() => window.location.href = `/tournaments/${tournament["tournamentid"]}`} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-6 border-b text-center">{tournament["tournamentname"]}</td>
                <td className="py-2 px-6 border-b text-center">{tournament["tournamentid"]}</td>
                <td className="py-2 px-6 border-b text-center">{tournament["tournamentdate"]}</td>
                <td className="py-2 px-6 border-b text-center">{tournament["starttime"]} - {tournament["endtime"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default Tournaments;
