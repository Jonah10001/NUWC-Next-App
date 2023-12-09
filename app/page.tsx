import React from 'react';
import Logo from '../public/transparentnuwclogo.png';
import Image from 'next/image';
import '../app/globals.css';
import Navbar from '../components/navbar';
// import {Carousel} from '../components/carousel';
// import images from "../data/carouselData.json"

export default function Homepage() {
  // const slides = images;
  // console.log("slides");

  // console.log(slides);
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center'>
        <div>
          <Image src={Logo} alt={'Northwestern World Cup Logo'} width={500}/>
        </div>
        <div>
          <p className="text-3xl"> Community. Philanthropy. Soccer. </p>
        </div>

      </div>
      {/* <Carousel data={slides["slides"]}/> */}
      <div className='flex justify-center items-center'>
        <div className="flex flex-col gap-y-4 w-[75vw]">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Events</p>
            <p>We run a variety of events every year, including tournaments (futsal, FIFA, halloween-themed), cultural events, freestyler shows, and trips to Chicago Fire games.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Recruitment</p>
            <p>World Cup recruits freshmen, sophomores, juniors, and seniors every year in the fall. To get in touch, email us at northwesternworldcup@gmail.com, or reach out to one of our exec board members through the contact tab!</p>
          </div>
        </div>
      </div>
    </div>
  );
}