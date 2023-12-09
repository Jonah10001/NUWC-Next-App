import React, {useState} from 'react';
import '../app/globals.css';
import ImageUploader from './imageUpload';
import axios from "axios";

interface ModalProps {
  tournamentid: number | null;
  onClose: () => void;
  hidden: boolean;
}

const Modal: React.FC<ModalProps> = ({ tournamentid, onClose, hidden }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFlierSubmit = async () => {
        try {
            const imageData = {
              tournamentid: tournamentid,
              based: image
            };

            setLoading(true);
        
            console.log("image data");
            console.log(imageData);
            const data = JSON.stringify(imageData);
            console.log("data");
            console.log(data);
            
            const response = await axios.post("https://u1oql6qrwb.execute-api.us-east-2.amazonaws.com/test_stage/add-flier", data);
            console.log("Response:", response.data);
          } catch (error) {
            alert((error as Error).message);
          } finally {
            setLoading(false);
            alert("flier updated!");
          }
    };

  return (
    <>
      {hidden ? null : (
        <div className="fixed w-screen h-screen bg-black bg-opacity-10 z-10">
          <div className="flex justify-center items-center">
            <div className="w-fit h-fit bg-white flex flex-col justify-center items-center">
              <p>Upload Tournament Flier</p>
              <ImageUploader setPrevImage={setImage}/>
              <h2>Tournament ID: {tournamentid || "Not Set"}</h2>
              <button className="p-3 rounded-xl bg-green-400 text-white" onClick={handleFlierSubmit}>
                Submit Flier
              </button>
              {loading && (<div className="p-3 text-xl">Loading...</div>)}
              <button className="p-3 rounded-xl bg-red-400 text-white" onClick={onClose}>
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;