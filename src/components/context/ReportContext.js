import React, { createContext, useState, useEffect } from 'react';
import { saveData, getData } from './db'; // Importa las funciones de IndexedDB

// Crear el contexto
export const ReportContext = createContext();

// Proveedor del contexto
export const ReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(() => {
    // Intentar cargar datos desde IndexedDB
    const loadInitialData = async () => {
      try {
        const data = await getData('reportData');
        return data || { title: '', month: '', pages: [] };
      } catch (error) {
        console.error('Error loading data from IndexedDB', error);
        return { title: '', month: '', pages: [] };
      }
    };

    // Ejecutar la carga inicial de datos
    const initializeData = async () => {
      const initialData = await loadInitialData();
      setReportData(initialData);
    };

    initializeData();

    // Valor inicial por defecto
    return { title: '', month: '', pages: [] };
  });

  // Guardar en IndexedDB cada vez que cambie el estado
  useEffect(() => {
    const saveToDB = async () => {
      try {
        await saveData({ id: 'reportData', ...reportData });
      } catch (error) {
        console.error('Error saving data to IndexedDB', error);
      }
    };

    saveToDB();
  }, [reportData]);

  // Función para agregar una nueva página
  const addPage = (pageData) => {
    setReportData((prevData) => ({
      ...prevData,
      pages: [...prevData.pages, pageData],
    }));
  };

  // Función para actualizar una página existente
  const updatePage = (pageIndex, updatedPage) => {
    setReportData((prevData) => ({
      ...prevData,
      pages: prevData.pages.map((page, index) =>
        index === pageIndex ? updatedPage : page
      ),
    }));
  };

  // Función para eliminar una página por su índice
  const deletePage = (pageIndex) => {
    setReportData((prevData) => ({
      ...prevData,
      pages: prevData.pages.filter((_, index) => index !== pageIndex),
    }));
  };

  // Función para eliminar la última página agregada
  const deleteLastPage = () => {
    setReportData((prevData) => ({
      ...prevData,
      pages: prevData.pages.slice(0, -1),
    }));
  };

  return (
    <ReportContext.Provider value={{ reportData, setReportData, addPage, updatePage, deletePage, deleteLastPage }}>
      {children}
    </ReportContext.Provider>
  );
};
