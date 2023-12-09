import React, { useEffect, useState } from 'react';
import '../../app/globals.css';
import axios from "axios";
import Navbar from '@/components/navbar';

interface Player {
    playerid: number,
    playername: string,
    teamid: number
}

interface InputPlayer {
    playername: string | null,
    teamid: number | null,
}

interface Tournament {
    tournamentid: number;
    tournamentname: string;
    tournamentdate: Date | null;
    starttime: Date | null;
    endtime: Date | null;
  }

interface Team {
    teamid: number,
    tournamentid: number,
    numplayers: number,
    teamname: string
}

export default function AddPlayer() {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [tournamentLoading, setTournamentLoading] = useState(true);
    const [tournamentError, setTournamentError] = useState<string | null>(null);
    const [teamError, setTeamError] = useState<string | null>(null);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [newPlayer, setNewPlayer] = useState<InputPlayer>({
        playername: null,
        teamid: null
    });
    const [triggerRerender, setTriggerRerender] = useState(false);

    // useEffect(() => {
    //     console.log(newGame);
    // }, [newGame]);
    
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedTournament(selectedValue);
    };

    const handleSelectChange2 = (event) => {
        const selectedValue = event.target.value;
        setSelectedTeam(selectedValue);
        setNewPlayer({
            ...newPlayer,
            teamid: selectedValue
        })
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
  }, [selectedTournament]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get<Player[]>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/players/${selectedTeam}`);
        console.log("response");
        console.log(response.data);
        setPlayers(response.data.reverse());
      } catch (error) {
        setTeamError((error as Error).message);
      }
    };
  
    if (selectedTournament !== null && selectedTeam !== null) {
      fetchTeams();
    }
  }, [selectedTeam, triggerRerender]);

  const handleAddPlayer = async () => {
    try {
        const playerData = {
          ...newPlayer,
        };
    
        console.log("tournament data");
        console.log(playerData);
        const data = JSON.stringify(playerData);
        console.log("data");
        console.log(data);
        
        const response = await axios.post("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/add-player", data);
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
        <div>
            <label htmlFor="teamSelect">Select a Team:</label>
            <select
                id="teamSelect"
                value={selectedTeam}
                onChange={handleSelectChange2}
                className='m-4'
            >
                <option value="" disabled>
                Select a team
                </option>
                {teams.map((team) => (
                <option key={team.teamid} value={team.teamid}>
                    {team.teamname}
                </option>
                ))}
            </select>
        </div>

        {/* {tournamentSelected ? ( */}
            <div className="grid grid-cols-[1fr,2fr] gap-5 p-4 w-full">
            <div className="space-y-3 p-4 flex flex-col justify-center items-center border border-black rounded-xl max-h-fit">
            <h2 className="text-2xl font-bold m-2">Add Player</h2>
            <div className='w-full flex justify-start items-center'>
                <label className="w-1/3">Player Name:</label>
                <input
                    type="text"
                    className="p-2 rounded-xl w-2/3"
                    placeholder="eg. Joe Smith"
                    value={newPlayer.playername}
                    onChange={(event) => setNewPlayer({
                        ...newPlayer,
                        playername: event.target.value
                    })}
                />
            </div>
            <button onClick={handleAddPlayer} className="px-4 py-2 bg-green-400 rounded-full">Add Player</button>
            </div>
            <div className="p-4 flex flex-col justify-start items-center border border-black rounded-xl">
            <h2 className="text-2xl font-bold m-5">Current Players</h2>
            <div className="w-full px-4 grid grid-cols-3 font-semibold">
                <p className="flex justify-center items-center text-center">Player ID</p>
                <p className="flex justify-center items-center text-center">Player Name</p>
                <p className="flex justify-center items-center text-centerr">Team ID</p>
            </div>
            <div className="my-5">
                {tournamentLoading ? (
                <div>Loading</div>
                ) : (
                tournamentError ? (
                    <div>{tournamentError}</div>
                ) : (
                    <div className="max-h-[50vh] overflow-auto">
                    {players.map((player) => (
                        <div className="w-full p-4 bg-white grid grid-cols-3 font-semibold text-sm border border-black">
                            <p className="flex justify-center items-center text-center">{player.playerid}</p>
                            <p className="flex justify-center items-center text-center">{player.playername}</p>
                            <p className="flex justify-center items-center text-center">{player.teamid}</p>
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
