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

interface Tournament {
    tournamentid: number;
    tournamentname: string;
    tournamentdate: Date | null;
    starttime: Date | null;
    endtime: Date | null;
  }

interface Game {
  gameid: number;
  tournamentid: number;
  hometeam: string;
  awayteam: string;
  homescore: number;
  awayscore: number;
  starttime: Date;
  round: string;
  played: boolean
}

interface InputGame {
    tournamentid: number | null;
    hometeam: string | null;
    awayteam: string | null;
    homescore: number | null;
    awayscore: number | null;
    starttime: Date | null;
    round: string | null;
    played: boolean | null;
}

export default function AddGame() {
    const [games, setGames] = useState<Game[]>([]);
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [tournamentLoading, setTournamentLoading] = useState(true);
    const [tournamentError, setTournamentError] = useState<string | null>(null);
    const [gameError, setGameError] = useState<string | null>(null);
    const [teamError, setTeamError] = useState<string | null>(null);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [newGame, setNewGame] = useState<InputGame>({
        tournamentid: null,
        hometeam: teams && teams.length > 0 ? teams[0].teamname : null,
        awayteam: teams && teams.length > 0 ? teams[0].teamname : null,
        homescore: null,
        awayscore: null,
        starttime: null,
        round: null,
        played: null,
      });
    const [triggerRerender, setTriggerRerender] = useState(false);

    useEffect(() => {
        console.log(newGame);
    }, [newGame]);
    
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      setNewGame({
        ...newGame,
        tournamentid : selectedValue,
      })
      setSelectedTournament(selectedValue);
    };
    
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await axios.get<Game[]>(`https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/games/${selectedTournament}`);
          console.log("response");
          console.log(response.data);
          setGames(response.data.reverse());
        } catch (error) {
          setGameError((error as Error).message);
        }
      };
    
      if (selectedTournament !== null) {
        fetchGames();
      }
    }, [selectedTournament, triggerRerender]);

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
        setNewGame({
            ...newGame,
            hometeam : response.data.reverse()[0].teamname,
            awayteam : response.data.reverse()[0].teamname,
        });
      } catch (error) {
        setTeamError((error as Error).message);
      }
    };
  
    if (selectedTournament !== null) {
      fetchTeams();
    }
  }, [selectedTournament]);

  const handleGameChange = (field, value) => {
    setNewGame((prevGame) => ({
      ...prevGame,
      [field]: value,
    }));
  };

  const handleAddGame = async () => {
    try {
      const input = {
        ...newGame,
        played: true,
        starttime: newGame.starttime || null,
      };
  
      const formattedStartTime = input.starttime
        ? new Date(input.starttime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        : null;
  
      const gameData = {
        ...input,
        starttime: formattedStartTime,
      };
  
      console.log("tournament data");
      console.log(gameData);
      const data = JSON.stringify(gameData);
      console.log("data");
      console.log(data);
      
      const response = await axios.post("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/add-game", data);
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
        <h1 className="text-3xl font-bold mt-5">Game Console</h1>
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
            <h2 className="text-2xl font-bold m-2">Add Game</h2>
            <div className='w-full flex justify-start items-center'>
                <label className="w-1/3">Home Team:</label>
                <select
                    className="p-2 rounded-xl w-2/3"
                    placeholder="eg. Spring Invitational"
                    value={newGame.hometeam}
                    onChange={(event) => handleGameChange('hometeam', event.target.value)}
                >
                    {teams.map((team, index) => (
                    <option
                        key={team.teamname}
                        value={team.teamname}
                    >
                        {team.teamname}
                    </option>
                    ))}
                </select>
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className="w-1/3">Away Team:</label>
                <select
                    className="p-2 rounded-xl w-2/3"
                    placeholder="eg. Spring Invitational"
                    value={newGame.awayteam}
                    onChange={(event) => handleGameChange('awayteam', event.target.value)}
                >
                    {teams.map((team, index) => (
                        <option key={team.teamname} value={team.teamname}>
                            {team.teamname}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className='w-1/3'>Home Score:</label>
                <input
                className="p-2 rounded-xl w-2/3"
                type="number"
                placeholder="eg. 0"
                value={newGame.homescore}
                onChange={(event) => handleGameChange('homescore', event.target.value)}
                />
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className='w-1/3'>Away Score:</label>
                <input
                className="p-2 rounded-xl w-2/3"
                type="number"
                placeholder="eg. 0"
                value={newGame.awayscore}
                onChange={(event) => handleGameChange('awayscore', event.target.value)}
                />
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className='w-1/3'>Start Time:</label>
                <div className='bg-white p-2 rounded-xl w-2/3'>
                <DatePicker
                    showTimeSelect
                    required
                    showPopperArrow={false}
                    showTimeSelectOnly
                    placeholderText="-- : --"
                    timeIntervals={15}
                    autoComplete="off"
                    dateFormat="h:mm aa"
                    timeFormat="h:mm aa"
                    selected={newGame.starttime}
                    onChange={(date) => handleGameChange('starttime', date)}
                />
                </div>
            </div>
            <div className='w-full flex justify-start items-center'>
                <label className='w-1/3'>Round:</label>
                <input
                className="p-2 rounded-xl w-2/3"
                type="text"
                placeholder="eg. Quarterfinals"
                value={newGame.round}
                onChange={(event) => handleGameChange('round', event.target.value)}
                />
            </div>
            <button onClick={handleAddGame} className="px-4 py-2 bg-green-400 rounded-full">Add Game</button>
            </div>
            <div className="p-4 flex flex-col justify-start items-center border border-black rounded-xl">
            <h2 className="text-2xl font-bold m-5">Current Games</h2>
            <div className="w-full px-4 grid grid-cols-7 font-semibold">
                <p className="flex justify-center items-center text-center">Game ID</p>
                <p className="flex justify-center items-center text-center">Home Team</p>
                <p className="flex justify-center items-center text-centerr">Away Team</p>
                <p className="flex justify-center items-center text-center">Home Score</p>
                <p className="flex justify-center items-center text-center">Away Score</p>
                <p className="flex justify-center items-center text-centerr">Start Time</p>
                <p className="flex justify-center items-center text-centerr">Round</p>
            </div>
            <div className="my-5">
                {tournamentLoading ? (
                <div>Loading</div>
                ) : (
                tournamentError ? (
                    <div>{tournamentError}</div>
                ) : (
                    <div className="max-h-[50vh] overflow-auto">
                    {games.map((game) => (
                        <div className="w-full p-4 bg-white grid grid-cols-7 font-semibold text-sm border border-black">
                        <p className="flex justify-center items-center text-center">{game.gameid}</p>
                        <p className="flex justify-center items-center text-center">{game.hometeam}</p>
                        <p className="flex justify-center items-center text-center">{game.awayteam}</p>
                        <p className="flex justify-center items-center text-center">{game.homescore}</p>
                        <p className="flex justify-center items-center text-center">{game.awayscore}</p>
                        <p className="flex justify-center items-center text-center">{game.starttime}</p>
                        <p className="flex justify-center items-center text-center">{game.round}</p>
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
