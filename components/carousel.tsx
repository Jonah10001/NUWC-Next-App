import React from 'react';
import Image from 'next/image';
import Logo from '../public/transparentnuwclogo.png';

// Import your CSS or styles here
import '../app/globals.css';

export const Carousel = ({ data }) => {
    console.log(data);
    // return(<div></div>);
    return (
    <div className="flex justify-center items-center">
      {data.map((item, idx) => {
        return <Image src={Logo} alt={"Image 1"} key={idx} width={600} height={400}/>;
      })}
    </div>
  );
};
