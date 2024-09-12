// DynamicTextLayout.js
const calculateTextLayout = (numPhotos) => {
    let layout = {
      x: 3,
      y: 10,
      maxWidth: 55,
      maxHeight: 10,
    };
  
    switch (numPhotos) {
      case 1:
        layout = {
          x: 3,
          y: 10, // Se ajusta para que quede bien con la imagen grande
          maxWidth: 55,
          maxHeight: 10,
        };
        break;
      case 2:
        layout = {
          x: 3,
          y: 10, // Se ajusta para que quede bien con dos imágenes en columnas
          maxWidth: 55,
          maxHeight: 10,
        };
        break;
      case 3:
        layout = {
          x: 3,
          y: 10, // Se ajusta para que quede bien con tres imágenes en una fila
          maxWidth: 55,
          maxHeight: 10,
        };
        break;
      case 4:
        layout = {
          x: 3,
          y: 10, // Ajusta la posición para que quede bien con cuatro imágenes
          maxWidth: 55,
          maxHeight: 10,
        };
        break;
      case 5:
        layout = {
          x: 3,
          y: 10, // Ajusta la posición para que quede bien con cinco imágenes
          maxWidth: 55,
          maxHeight: 5,
        };
        break;
      case 6:
        layout = {
          x: 3,
          y: 10, // Ajusta la posición para que quede bien con seis imágenes
          maxWidth: 55,
          maxHeight: 10,
        };
        break;
      default:
        break;
    }
  
    return layout;
  };
  
  export default calculateTextLayout;
  