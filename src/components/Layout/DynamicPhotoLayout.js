// DynamicPhotoLayout.js
const calculateLayout = (numPhotos) => {
    let layout = [];
  
    switch (numPhotos) {
      case 1:
        layout.push({ x: 20, y: 16.5, width: 20, height: 15 }); // Imagen centrada
        break;
      case 2:
        layout.push({ x: 5, y: 16.5, width: 20, height: 15 });  // Primera imagen
        layout.push({ x: 35, y: 16.5, width: 20, height: 15 }); // Segunda imagen
        break;
      case 3:
        layout.push({ x: 5, y: 17, width: 15, height: 10 });
        layout.push({ x: 22.5, y: 17, width: 15, height: 10 });
        layout.push({ x: 40, y: 17, width: 15, height: 10 });
        break;
      case 4:
        layout.push({ x: 3, y: 18, width: 12, height: 10 });
        layout.push({ x: 17, y: 18, width: 12, height: 10 });
        layout.push({ x: 31, y: 18, width: 12, height: 10 });
        layout.push({ x: 45, y: 18, width: 12, height: 10 });
        break;
      case 5:
        layout.push({ x: 7, y: 15.3, width: 10, height: 8 });
        layout.push({ x: 24.5, y: 15.3, width: 10, height: 8 });
        layout.push({ x: 42, y: 15.3, width: 10, height: 8 });
        layout.push({ x: 16, y: 24, width: 10, height: 8 });
        layout.push({ x: 33, y: 24, width: 10, height: 8 });
        break;
      case 6:
        layout.push({ x: 8, y: 15, width: 10, height: 8 });
        layout.push({ x: 25.5, y: 15, width: 10, height: 8 });
        layout.push({ x: 43, y: 15, width: 10, height: 8 });
        layout.push({ x: 8, y: 24, width: 10, height: 8 });
        layout.push({ x: 25.5, y: 24, width: 10, height: 8 });
        layout.push({ x: 43, y: 24, width: 10, height: 8 });
        break;
      default:
        break;
    }
  
    return layout;
  };
  
  export default calculateLayout;
  