import React, { useState } from 'react';
import CropImage from './photos/CropImage'; // Asegúrate de que esta ruta sea correcta

const PhotoUploader = ({ onPhotoUpload }) => {
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    // Una vez que la imagen está recortada, la enviamos al componente padre (PageEditor)
    onPhotoUpload([croppedImage]);
    setShowCropper(false);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          style={{ marginBottom: '10px' }}
        />
      </div>

      {showCropper && (
        <CropImage
          imageSrc={imageToCrop}
          onCropCompleteCallback={handleCropComplete}
          onClose={() => setShowCropper(false)}
        />
      )}
    </>
  );
};

export default PhotoUploader;
