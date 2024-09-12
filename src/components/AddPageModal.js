import React, { useState, useContext, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoUploader from './PhotoUploader';
import { ReportContext } from './context/ReportContext';

import AlbercaTemplate from './images/BackgroundTemplates/AlbercaTemplate.JPG'
import AvisosTemplate from './images/BackgroundTemplates/AvisosTemplate.JPG'
import ConserjeriaTemplate from './images/BackgroundTemplates/ConserjeríaTemplate.JPG'
import Jardineria from './images/BackgroundTemplates/JardineriaTemplate.JPG'
import JardineriaBeforeAndThen from './images/BackgroundTemplates/JardineríaAntesYDespuesTemplate.JPG'
import MantenimientoTemplate from './images/BackgroundTemplates/MantenimientoTemplate.JPG'
import SeguridadTemplate from './images/BackgroundTemplates/SeguridadTemplate.JPG'

const AddPageModal = ({ open, onClose }) => {
  const { addPage } = useContext(ReportContext);
  const [pageType, setPageType] = useState('');
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [maxChars, setMaxChars] = useState(400); // Default max characters

  useEffect(() => {
    // Set maxChars based on the number of images
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
  
    // Variable para almacenar la plantilla seleccionada
    let selectedTemplate;
  
    // Asignar la plantilla basada en el tipo de reporte seleccionado
    switch (pageType) {
      case 'Jardinería':
        selectedTemplate = Jardineria;
        break;
      case 'Conserjería':
        selectedTemplate = ConserjeriaTemplate;
        break;
      case 'Mantenimiento de Alberca':
        selectedTemplate = AlbercaTemplate;
        break;
      case 'Seguridad':
        selectedTemplate = SeguridadTemplate;
        break;
      case 'Áreas Comunes':
        selectedTemplate = JardineriaBeforeAndThen;
        break;
      case 'Mantenimiento':
        selectedTemplate = MantenimientoTemplate;
        break;
      case 'Avisos':
        selectedTemplate = AvisosTemplate;
        break;
      default:
        selectedTemplate = '';
        break;
    }
  
    // Crear el nuevo objeto de página con la plantilla seleccionada
    const newPage = { 
      id: Date.now(), 
      title: pageType, 
      type: pageType, 
      text: text, 
      photos: images, 
      template: selectedTemplate // Asignamos la plantilla aquí
    };
  
    addPage(newPage); // Agrega la página al contexto
    handleClose(); // Limpia el modal
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

  // Calculate the number of characters left
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
          overflowY: 'auto' // Habilita el desplazamiento vertical
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
          <TextField 
            fullWidth 
            select 
            value={pageType} 
            onChange={(e) => setPageType(e.target.value)}
            SelectProps={{ native: true }}
            required
            label="Tipo de Reporte"
          >
            <option value=""></option>
            <option value="Jardinería">Jardinería</option>
            <option value="Conserjería">Conserjería</option>
            <option value="Mantenimiento de Alberca">Mantenimiento de Alberca</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Avisos">Avisos</option>
          </TextField>
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
            inputProps={{ maxLength: maxChars }} // Ajusta la longitud máxima
            sx={{ textAlign: 'justify' }} // Justifica el texto
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
