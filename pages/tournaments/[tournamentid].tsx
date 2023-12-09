import { useRouter } from 'next/router';
import '../../app/globals.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../../components/navbar';
import Schedule from '../../components/schedule';
import Standings from '../../components/standings';
import Teams from '../../components/displayTeams';
import Flier from '../../components/displayFlier';

const TournamentPage = () => {
  const router = useRouter();
  const { tournamentid } = router.query;
  const [value, setValue] = useState<string | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [componentToRender, setComponentToRender] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    if (value === "standings") {
      setComponentToRender(<Standings tournamentid={tournamentid as string} />);
    } else if (value === "schedule") {
      setComponentToRender(<Schedule tournamentid={tournamentid as string} />);
    } else if (value === "teams") {
      setComponentToRender(<Teams tournamentid={tournamentid as string} />);
    } else {
      setComponentToRender(<Flier tournamentid={tournamentid as string} />);
    }
  }, [value, tournamentid]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <div><p>Error {error}</p></div>;
  // }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <ul className="grid grid-cols-3 gap-4 p-4 m-4">
          <li><button onClick={() => { setValue("schedule") }} className="text-black hover:bg-gray-300 rounded-xl p-4">Tournament Schedule</button></li>
          <li><button onClick={() => { setValue("standings") }} className="text-black hover:bg-gray-300 rounded-xl p-4">Tournament Standings</button></li>
          <li><button onClick={() => { setValue("teams") }} className="text-black hover:bg-gray-300 rounded-xl p-4">Tournament Teams</button></li>
        </ul>
        <p className="font-semibold m-3">Tournament ID: {tournamentid}</p>
        <div>
          {componentToRender}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;