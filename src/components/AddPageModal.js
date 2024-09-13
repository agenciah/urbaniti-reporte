import React, { useState, useContext, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoUploader from './PhotoUploader';
import { ReportContext } from './context/ReportContext';
import TemplateSelector from './TemplateSelector'; // Importa el nuevo componente
import ReportTypeSelector from './ReportTypeSelector'; // Importa el nuevo componente

const AddPageModal = ({ open, onClose }) => {
  const { addPage } = useContext(ReportContext);
  const [pageType, setPageType] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [maxChars, setMaxChars] = useState(400); // Default max characters

  useEffect(() => {
    if (images.length <= 2) {
      setMaxChars(400);
    } else if (images.length <= 4) {
      setMaxChars(380);
    } else {
      setMaxChars(273);
    }
  }, [images]);

  const handleAddPage = () => {
    if (!pageType || !text || images.length === 0) {
      setError('Debe seleccionar un tipo de reporte, ingresar un texto y agregar al menos una imagen.');
      return;
    }

    const selectedTemplate = TemplateSelector({ pageType }); // Utiliza el TemplateSelector para obtener la plantilla
    const newPage = { 
      id: Date.now(), 
      title: pageType, 
      type: pageType, 
      text: text, 
      photos: images, 
      template: selectedTemplate
    };

    addPage(newPage); 
    handleClose(); 
  };

  const handleImageUpload = (newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const handleClose = () => {
    setPageType('');
    setText('');
    setImages([]);
    setError('');
    onClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const charsLeft = maxChars - text.length;
  let charsColor = 'green';
  if (charsLeft < 0) charsColor = 'red';
  else if (charsLeft < 50) charsColor = 'orange';

  return (
    <Modal open={open} onClose={handleClose}>
      <Box 
        sx={{ 
          width: 600, 
          maxHeight: '80vh', 
          bgcolor: 'background.paper', 
          p: 4, 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          borderRadius: 2,
          overflowY: 'auto'
        }}
      >
        <Typography variant="h6" component="h2">
          Agregar Página
        </Typography>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <Box mt={2}>
          {/* Utiliza el nuevo selector de tipo de reporte */}
          <ReportTypeSelector pageType={pageType} setPageType={setPageType} />
        </Box>
        <Box mt={2}>
          <PhotoUploader onPhotoUpload={handleImageUpload} />
          <Box mt={2} sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <img
                  src={image}
                  alt={`Imagen ${index}`}
                  style={{ width: '100px', height: '100px', marginRight: '8px' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            {`Para 1 imagen los caracteres máximos son: 400, de 3 a 4 imágenes los caracteres máximos son: 380, finalmente de 5 a 6 fotos los caracteres máximos son 273.`}
          </Typography>
          <TextField 
            fullWidth 
            multiline 
            rows={4} 
            label="Texto" 
            value={text} 
            onChange={handleTextChange}
            placeholder="Escribe el texto aquí"
            required
            inputProps={{ maxLength: maxChars }} 
            sx={{ textAlign: 'justify' }}
          />
          <Box mt={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color={charsColor}>
              {charsLeft} caracteres restantes
            </Typography>
          </Box>
        </Box>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleCancel}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleAddPage}>Agregar Página</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPageModal;
