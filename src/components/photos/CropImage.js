import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './CropUtils'; // Asegúrate de que esta ruta sea correcta

const CropImage = ({ imageSrc, onCropCompleteCallback, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  // Maneja el recorte al completar el área de recorte
  const handleCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  // Maneja la acción de guardar la imagen recortada
  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedArea);
      onCropCompleteCallback(croppedImage); // Envia la imagen recortada al componente padre
    } catch (error) {
      console.error('Error al recortar la imagen:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3} // Ajusta la relación de aspecto si es necesario
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        style={{ containerStyle: { height: '100%' } }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100, // Asegura que los botones estén sobre el fondo
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={handleSaveCrop}
          style={{
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
          onClick={onClose}
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

export default CropImage;
