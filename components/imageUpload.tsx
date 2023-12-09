import React, { useState } from 'react';

function ImageUploader({ setPrevImage }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const base64String = event.target.result;
                setImage(base64String);  // Set the preview here
                setPrevImage(base64String);
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="h-[50vh] w-[50vw] flex justify-center items-center">
            <input type="file" onChange={handleImageChange} />
            {image && <img className="h-1/2" src={image} alt="Uploaded" />}
        </div>
    );
}

export default ImageUploader;