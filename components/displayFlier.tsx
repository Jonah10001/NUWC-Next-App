import React, {useEffect , useState} from 'react';
import axios from 'axios';
import { setFlagsFromString } from 'v8';

interface ScheduleProps {
  tournamentid: string
}

const Flier: React.FC<ScheduleProps> = ({ tournamentid }) => {
  const [flier, setFlier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchFlierURL = async () => {
      try {
        const response = await axios.get(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/flier/${tournamentid}`);
        console.log("response");
        console.log(response.data);
        setFlier(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlierURL();
  }, []);

  return (
    <img src={flier} />
  );
};

export default Flier;