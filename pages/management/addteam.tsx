import React, { useEffect, useState } from 'react';
import '../../app/globals.css';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/components/navbar';

interface Team {
    teamid: number,
    tournamentid: number,
    numplayers: number,
    teamname: string
}

interface InputTeam {
    tournamentid: number,
    numplayers: number,
    teamname: string
}

interface Tournament {
    tournamentid: number;
    tournamentname: string;
    tournamentdate: Date | null;
    starttime: Date | null;
    endtime: Date | null;
  }

export default function AddTeam() {
    // const [games, setGames] = useState<Game[]>([]);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [tournamentLoading, setTournamentLoading] = useState(true);
    const [tournamentError, setTournamentError] = useState<string | null>(null);
    const [teamError, setTeamError] = useState<string | null>(null);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [newTeam, setNewTeam] = useState<InputTeam>({
        tournamentid: null,
        teamname: null,
        numplayers: null,
    });
    const [triggerRerender, setTriggerRerender] = useState(false);

    // useEffect(() => {
    //     console.log(newGame);
    // }, [newGame]);
    
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;

        // Assuming you also have a newGame state
        // Replace the following line with the correct state variable if needed
        setNewTeam({
            ...newTeam,
            tournamentid: selectedValue,
        });

        setSelectedTournament(selectedValue);
    };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get<Tournament[]>("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/tournaments");
        console.log("response");
        console.log(response.data);
        setTournaments(response.data.reverse());
      } catch (error) {
        setTournamentError((error as Error).message);
      } finally {
        setTournamentLoading(false);
      }
    };
  
    if (tournamentLoading) {
      fetchTournaments();
    }
  }, [tournamentLoading]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get<Team[]>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/teams/${selectedTournament}`);
        console.log("response");
        console.log(response.data);
        setTeams(response.data.reverse());
      } catch (error) {
        setTeamError((error as Error).message);
      }
    };
  
    if (selectedTournament !== null) {
      fetchTeams();
    }
  }, [selectedTournament, triggerRerender]);

  const handleTeamChange = (field, value) => {
    setNewTeam((prevTeam) => ({
      ...prevTeam,
      [field]: value,
    }));
  };

  const handleAddTeam = async () => {
    try {
      const teamData = {
        ...newTeam,
      };
  
      console.log("tournament data");
      console.log(teamData);
      const data = JSON.stringify(teamData);
      console.log("data");
      console.log(data);
      
      const response = await axios.post("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/add-team", data);
      console.log("Response:", response.data);
    } catch (error) {
      alert((error as Error).message);
    } finally {
        setTriggerRerender(!triggerRerender);
    }
  };

  return (
    <div>
        <Navbar />
        <div className="flex justify-center items-center flex-col gap-5">
        <h1 className="text-3xl font-bold mt-5">Team Console</h1>
        <div>
            <label htmlFor="tournamentSelect">Select a Tournament:</label>
            <select
                id="tournamentSelect"
                value={selectedTournament}
                onChange={handleSelectChange}
                className='m-4'
            >
                <option value="" disabled>
                Select a tournament
                </option>
                {tournaments.map((tournament) => (
                <option key={tournament.tournamentid} value={tournament.tournamentid}>
                    {tournament.tournamentname}
                </option>
                ))}
            </select>
        </div>

        {/* {tournamentSelected ? ( */}
            <div className="grid grid-cols-[1fr,2fr] gap-5 p-4 w-full">
            <div className="space-y-3 p-4 flex flex-col justify-center items-center border border-black rounded-xl max-h-fit">
            <h2 className="text-2xl font-bold m-2">Add Team</h2>
            <div className='w-full flex justify-start items-center'>
                <label className="w-1/3">Team Name:</label>
                <input
                    type="text"
                    className="p-2 rounded-xl w-2/3"
                    placeholder="eg. Chicago Bears"
                    value={newTeam.teamname}
                    onChange={(event) => handleTeamChange('teamname', event.target.value)}
                />
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className="w-1/3">Number of Players:</label>
                <input
                    type="number"
                    className="p-2 rounded-xl w-2/3"
                    placeholder="eg. 11"
                    value={newTeam.numplayers}
                    onChange={(event) => handleTeamChange('numplayers', event.target.value)}
                />
            </div>
            <button onClick={handleAddTeam} className="px-4 py-2 bg-green-400 rounded-full">Add Team</button>
            </div>
            <div className="p-4 flex flex-col justify-start items-center border border-black rounded-xl">
            <h2 className="text-2xl font-bold m-5">Current Teams</h2>
            <div className="w-full px-4 grid grid-cols-3 font-semibold">
                <p className="flex justify-center items-center text-center">Team ID</p>
                <p className="flex justify-center items-center text-center">Number of Players</p>
                <p className="flex justify-center items-center text-centerr">Team Name</p>
            </div>
            <div className="my-5">
                {tournamentLoading ? (
                <div>Loading</div>
                ) : (
                tournamentError ? (
                    <div>{tournamentError}</div>
                ) : (
                    <div className="max-h-[50vh] overflow-auto">
                    {teams.map((team) => (
                        <div className="w-full p-4 bg-white grid grid-cols-3 font-semibold text-sm border border-black">
                            <p className="flex justify-center items-center text-center">{team.teamid}</p>
                            <p className="flex justify-center items-center text-center">{team.numplayers}</p>
                            <p className="flex justify-center items-center text-center">{team.teamname}</p>
                        </div>
                    ))}
                    </div>
                )
                )}
            </div>
            </div>
        </div>
        {/* // ) : (
        //     <select>
        //         <option>Select a tournament</option>
        //     </select>
        // )} */}
        </div>
    </div>
  );
}
