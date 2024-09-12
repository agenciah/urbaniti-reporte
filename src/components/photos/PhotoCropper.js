import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './CropUtils'; 

const PhotoCropper = ({ src, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const handleCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedArea);
      onCropComplete(croppedImage); // Envia la imagen recortada al componente padre
    } catch (e) {
      console.error('Error al recortar la imagen:', e);
    }
  };

  return (
    <div>
      <div className="crop-container">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          zIndex: 1100, // Asegura que los botones estén sobre el fondo gris
        }}
      >
        <button
          onClick={handleSaveCrop}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Recortar Imagen
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PhotoCropper;
