import React from 'react';
import '../app/globals.css';
import { Navbar } from '../components/navbar';

export default function Contact() {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-transparent via-white to-bg-start h-screen flex flex-col justify-center items-center">
        <div className="contact-content-container flex items-center justify-center space-x-8">
          <img
            src="/transparentnuwclogo.png" 
            alt="Club Logo"
            className="w-1/2" 
          />
          <div className="contact-card-container space-y-4">
            <div className="contact-card contact-card-President bg-white p-4 rounded-lg shadow-md flex">
              <div className="card-image">
                <img
                  src="https://encorecoda.com/wp-content/uploads/2021/11/Ben-Kofman-1-scaled.jpg"
                  alt="President Image"
                  className="w-32 h-32 rounded-full mr-4"
                />
              </div>
              <div className="card-details">
                <h2 className="text-xl font-semibold">President</h2>
                <p>Name: Ben Kofman</p>
                <p>Email: <a href="mailto:benkofman2024@u.northwestern.edu" className="text-blue-500 hover:underline">benkofman2024@u.northwestern.edu</a></p>
              </div>
            </div>
            <div className="contact-card contact-card-VP bg-white p-4 rounded-lg shadow-md flex">
              <div className="card-image">
                <img
                  src="https://drive.google.com/uc?id=1ldnq50Tl3bJaE9ozhtMiIvdfOUTWtPLN"
                  alt="Vice President Image"
                  className="w-32 h-32 rounded-full mr-4"
                />
            </div>
              <div className="card-details">
                <h2 className="text-xl font-semibold">Vice President</h2>
                <p>Name: Alex Margolis</p>
                <p>Email: <a href="mailto:alexmargolis2024@u.northwestern.edu" className="text-blue-500 hover:underline">alexmargolis2024@u.northwestern.edu</a></p>
              </div>
            </div>
            <div className="contact-card contact-card-TREASURER bg-white p-4 rounded-lg shadow-md flex">
              <div className="card-image">
                <img
                  src="https://drive.google.com/uc?id=1qFXj1BNgX0Z1Cv7-5unSIyNWuzjRThm2"
                  alt="Treasurer Image"
                  className="w-32 h-32 rounded-full mr-4"
                />
              </div>
              <div className="card-details">
                <h2 className="text-xl font-semibold">Treasurer</h2>
                <p>Name: Lauren Escudero</p>
                <p>Email: <a href="mailto:laurenescudero2025@u.northwestern.edu" className="text-blue-500 hover:underline">laurenescudero2025@u.northwestern.edu</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .contact-content-container {
            max-height: 80vh; 
            margin-bottom: 20px; 
          }

          .contact-card {
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .contact-card-President::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url('https://wallpapers.com/images/featured/chelsea-fc-logo-esvpoici90jl4fpx.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top-right;
            opacity: 0.2;
            z-index: 1;
          }

          .contact-card-VP::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url('https://www.thesun.co.uk/wp-content/uploads/2023/04/detailed-view-badge-manchester-united-811167421-1.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: left;
            opacity: 0.2;
            z-index: 1;
          }

          .contact-card-TREASURER::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url('https://images2.minutemediacdn.com/image/upload/c_crop,w_5156,h_2900,x_0,y_324/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_en_international_web/01g3xsrq61he6r6rjx4t.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0% 30%;
            opacity: 0.2;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
}
