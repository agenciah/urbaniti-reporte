import React, { useContext } from 'react';
import { ReportContext } from './context/ReportContext';

const CleanPageButton = ({ pageIndex }) => {
  const { reportData, setReportData } = useContext(ReportContext);

  const handleCleanPage = () => {
    const updatedPages = [...reportData.pages];
    updatedPages[pageIndex].text = '';
    updatedPages[pageIndex].photos = [];
    setReportData({ ...reportData, pages: updatedPages });
  };

  return <button onClick={handleCleanPage}>Limpiar Sección</button>;
};

export default CleanPageButton;
