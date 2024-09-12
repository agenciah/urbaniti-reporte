import React, { useState } from 'react';
import { ReportProvider } from './components/context/ReportContext';
import MonthSelector from './components/MonthSelector';
import PageList from './components/PageList';
import AddPageModal from './components/AddPageModal';
import DownloadReportButton from './components/DownloadReportButton';
import { Button, Typography, Box, Paper } from '@mui/material';

const App = () => {
  const [editorOpen, setEditorOpen] = useState(false);

  const handleOpenEditor = () => setEditorOpen(true);
  const handleCloseEditor = () => setEditorOpen(false);

  return (
    <ReportProvider>
      <div className="app-container" style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Generador de Reportes Operativos
        </Typography>
        
        {/* Contenedor de componentes */}
        <Box 
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Selector de Mes */}
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <MonthSelector />
          </Paper>
          
          {/* Botón para abrir el modal de agregar página */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained" 
              color="primary"
              onClick={handleOpenEditor}
            >
              Agregar Página
            </Button>
          </Box>
          
          {/* Modal de agregar página */}
          <AddPageModal open={editorOpen} onClose={handleCloseEditor} />
          
          {/* Lista de páginas creadas */}
          <Paper elevation={3} sx={{ padding: '16px' }}>
            <PageList />
          </Paper>
          
          {/* Botón para descargar el reporte */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <DownloadReportButton />
          </Box>
        </Box>
      </div>
    </ReportProvider>
  );
};

export default App;
