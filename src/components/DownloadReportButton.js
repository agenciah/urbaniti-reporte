import React, { useContext } from 'react';
import { jsPDF } from 'jspdf';
import { ReportContext } from './context/ReportContext';
import { Button } from '@mui/material';

// Importa el layout dinámico para las fotos y el texto
import calculateLayout from './Layout/DynamicPhotoLayout';
import calculateTextLayout from './Layout/DynamicTextLayout';

// Importa la imagen de la portada
import PortraitTemplate from './images/BackgroundTemplates/Portrait.JPG';

const DownloadReportButton = () => {
  const { reportData } = useContext(ReportContext);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [60.144, 33.831] // Ancho y alto en cm
    });

    // *** Portada ***
    doc.addImage(PortraitTemplate, 'JPEG', 0, 0, 60.144, 33.831);
    doc.setFont('Nunito', 'Medium');
    doc.setFontSize(74);
    doc.text(`INFORME DE ACTIVIDADES ${reportData.month} 2024`, 3, 15);

    // Añadir nuevas páginas
    if (reportData.pages.length > 0) {
      doc.addPage();
    }

    // *** Páginas del informe ***
    reportData.pages.forEach((page, index) => {
      // Añadir la plantilla de fondo de la página
      if (page.template) {
        doc.addImage(page.template, 'JPEG', 0, 0, 60.144, 33.831);
      }

      // Configurar el título de la página
      doc.setFont('Roboto', 'Regular');
      doc.setFontSize(40);
      doc.text(page.title || '', 3, 5);

      // Añadir el texto
      const textLayout = calculateTextLayout(page.photos ? page.photos.length : 0);
      const textLines = doc.splitTextToSize(page.text || '', textLayout.maxWidth);
      doc.text(textLines, textLayout.x, textLayout.y);

      // Añadir fotos usando el layout dinámico
      if (page.photos && page.photos.length > 0) {
        const layout = calculateLayout(page.photos.length);
        page.photos.forEach((image, imgIndex) => {
          const { x, y, width, height } = layout[imgIndex];
          doc.addImage(image, 'JPEG', x, y, width, height);
        });
      }

      // Añadir nueva página si no es la última
      if (index < reportData.pages.length - 1) {
        doc.addPage();
      }
    });

    // *** Descargar el PDF generado ***
    doc.save('Informe-de-actividades.pdf');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
      Descargar PDF
    </Button>
  );
};

export default DownloadReportButton;
