import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ScheduleProps {
  tournamentid: string;
}

const Flier: React.FC<ScheduleProps> = ({ tournamentid }) => {
  const [flier, setFlier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("tournament id");
    console.log(tournamentid);
  }, [tournamentid]);

  useEffect(() => {
    console.log("flier");
    console.log(flier);
  }, [flier]);

  useEffect(() => {
    const fetchFlierURL = async () => {
      try {
        const response = await axios.get(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/flier/${tournamentid}`);
        console.log("response");
        console.log(response.data);

        setFlier(response.data["https"]);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlierURL();
  }, [tournamentid]);

  if (flier === null) {
    return <div>Loading...</div>;
  }

  return (
    <img src={flier} alt="Tournament Flier" />
  );
};

export default Flier;