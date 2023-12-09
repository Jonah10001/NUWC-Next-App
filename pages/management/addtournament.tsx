import React, { useEffect, useState } from 'react';
import '../../app/globals.css';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/components/navbar';
import Modal from "@/components/modal"

interface Tournament {
  tournamentid: number;
  tournamentname: string;
  tournamentdate: Date | null;
  starttime: Date | null;
  endtime: Date | null;
}

interface InputTournament {
  tournamentname: string;
  tournamentdate: Date | null;
  starttime: Date | null;
  endtime: Date | null;
}

export default function AddTournament() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentLoading, setTournamentLoading] = useState(true);
  const [tournamentError, setTournamentError] = useState<string | null>(null);
  const [newTournament, setNewTournament] = useState<InputTournament>({
    tournamentname: '',
    tournamentdate: null,
    starttime: null,
    endtime: null
  });

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

  const handleTournamentChange = (number: number, value: string | Date | null) => {
    setNewTournament({
      ...newTournament,
      [number === 0 ? 'tournamentname' : (number === 1 ? 'tournamentdate' : (number === 2 ? 'starttime' : 'endtime'))]: value,
    });
  };

  const handleAddTournament = async () => {
    try {
      const input = {
        ...newTournament,
        tournamentdate: newTournament.tournamentdate ? newTournament.tournamentdate : null,
        starttime: newTournament.starttime ? newTournament.starttime.getTime() : null,
        endtime: newTournament.endtime ? newTournament.endtime.getTime() : null,
        flierbucketkey: "",
        inprogress: false
      };
  
      console.log("tournament date");
      console.log(input.tournamentdate);
      const formattedDate = input.tournamentdate
        ? new Date(input.tournamentdate).toISOString().split('T')[0]
        : null;
  
      const formattedStartTime = input.starttime
        ? new Date(input.starttime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        : null;
      
      const formattedEndTime = input.endtime
        ? new Date(input.endtime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        : null;
  
      const tournamentData = {
        ...input,
        tournamentdate: formattedDate,
        starttime: formattedStartTime,
        endtime: formattedEndTime
      };
  
      console.log("tournament data");
      console.log(tournamentData);
      const data = JSON.stringify(tournamentData);
      console.log("data");
      console.log(data);
      
      const response = await axios.post("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/add-tournament", data);
      console.log("Response:", response.data);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setTournamentLoading(true); 
    }
  };

  const [showModal, setShowModal] = useState<number|null>(null);

  useEffect(() => {
    console.log("show");
    console.log(showModal);
  }, [showModal]);

  return (
    <div>
        <Navbar />
        <div className="flex justify-center items-center flex-col gap-5">
        <h1 className="text-3xl font-bold mt-5">Tournament Console</h1>
            <Modal hidden={showModal === null ? true : false} tournamentid={showModal} onClose={() => setShowModal(null)}/>
            <div className="grid grid-cols-2 gap-5 p-4">
                <div className="space-y-3 p-4 flex flex-col justify-center items-center border border-black rounded-xl max-h-fit">
                <h2 className="text-2xl font-bold m-2">Add Tournament</h2>
                <div className='w-full flex justify-start items-center'>
                    <label className="w-1/2">Tournament Name:</label>
                    <input
                    className="p-2 rounded-xl w-1/2"
                    type="text"
                    placeholder="eg. Spring Invitational"
                    value={newTournament.tournamentname}
                    onChange={(event) => handleTournamentChange(0, event.target.value)}
                    />
                </div>
                <div className='w-full flex justify-start items-center'>
                    <label className="w-1/2">Tournament Date:</label>
                    <div className='bg-white p-2 rounded-xl w-1/2'>
                    <DatePicker
                        required
                        showPopperArrow={true}
                        autoComplete="off"
                        selected={newTournament.tournamentdate}
                        placeholderText="MM/DD/YYYY"
                        onChange={(event) => handleTournamentChange(1, event as Date | null)}
                        scrollableMonthYearDropdown
                        popperPlacement="bottom"
                    />
                    </div>
                </div>
                <div className='w-full flex justify-start items-center'>
                    <label className='w-1/2'>Tournament Start Time:</label>
                    <div className='bg-white p-2 rounded-xl w-1/2'>
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
                        selected={newTournament.starttime}
                        onChange={(event) => handleTournamentChange(2, event)}
                    />
                    </div>
                </div>
                <div className='w-full flex justify-start items-center'>
                    <label className='w-1/2'>Tournament End Time:</label>
                    <div className='bg-white p-2 rounded-xl w-1/2'>
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
                        selected={newTournament.endtime}
                        onChange={(event) => handleTournamentChange(3, event)}
                    />
                    </div>
                </div>
                <button className="px-4 py-2 bg-green-400 rounded-full" onClick={handleAddTournament}>Add Tournament</button>
                </div>
                <div className="p-4 flex flex-col justify-center items-center border border-black rounded-xl">
                <h2 className="text-2xl font-bold m-5">Current Tournaments</h2>
                <div className="w-full px-4 grid grid-cols-4 font-semibold">
                    <p className="flex justify-center items-center text-center">Name</p>
                    <p className="flex justify-center items-center text-center">ID</p>
                    <p className="flex justify-center items-center text-center">Date</p>
                    <p className="flex justify-center items-center text-centerr">Time</p>
                </div>
                <div className="my-5">
                    {tournamentLoading ? (
                    <div>Loading</div>
                    ) : (
                    tournamentError ? (
                        <div>{tournamentError}</div>
                    ) : (
                        <div className="max-h-[50vh] overflow-auto">
                        {tournaments.map((tournament, index) => (
                            <div key={index}
                            onClick={() => {setShowModal(tournament.tournamentid) }} 
                            className="w-full p-4 bg-white grid grid-cols-4 font-semibold text-sm border border-black">
                            <p className="flex justify-center items-center text-center">{tournament.tournamentname}</p>
                            <p className="flex justify-center items-center text-center">{tournament.tournamentid}</p>
                            <p className="flex justify-center items-center text-center">{tournament.tournamentdate?.toLocaleDateString()}</p>
                            <p className="flex justify-center items-center text-center">
                                {tournament.starttime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {tournament.endtime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            </div>
                        ))}
                        </div>
                    )
                    )}
                </div>
                </div>
            </div>
        </div>
    </div>
  );
}
