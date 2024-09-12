// DynamicPhotoLayout.js
import React, { useState } from 'react';
import PhotoCropper from './PhotoCropper';

const DynamicPhotoLayout = () => {
  const [images, setImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]);
    }
  };

  const handleCrop = (index, croppedImage) => {
    const updatedImages = [...croppedImages];
    updatedImages[index] = croppedImage;
    setCroppedImages(updatedImages);
  };

  const renderImages = () => {
    const layoutClasses = [
      'layout-one',
      'layout-two',
      'layout-three',
      'layout-four',
      'layout-five',
      'layout-six'
    ];

    const layoutClass = layoutClasses[images.length - 1];

    return (
      <div className={`dynamic-layout ${layoutClass}`}>
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={croppedImages[index] || image} alt={`Uploaded ${index}`} />
            <PhotoCropper image={image} onCrop={(croppedImage) => handleCrop(index, croppedImage)} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleAddImage} />
      <div>{renderImages()}</div>
    </div>
  );
};

export default DynamicPhotoLayout;
