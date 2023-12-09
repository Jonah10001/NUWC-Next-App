import React, { useEffect, useState } from 'react';
import '../app/globals.css';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function Management() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center flex-col gap-5">
      <h1 className="text-3xl font-bold mt-5">Management Console</h1>
      <div className="m-5 text-xl font-semibold w-4/5 flex justify-around">
        <Link href="/management/addtournament" className="bg-green-400 rounded-xl p-4 hover:bg-red-400">Edit Tournaments</Link>
        <Link href="/management/addgame" className="bg-green-400 rounded-xl p-4 hover:bg-red-400">Edit Games</Link>
        <Link href="/management/addteam" className="bg-green-400 rounded-xl p-4 hover:bg-red-400">Edit Teams</Link>
        <Link href="/management/addplayer" className="bg-green-400 rounded-xl p-4 hover:bg-red-400">Edit Players</Link>
      </div>
      </div>
    </div>
  );
}
