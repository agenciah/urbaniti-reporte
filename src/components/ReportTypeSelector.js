import React from 'react';
import TextField from '@mui/material/TextField';

const ReportTypeSelector = ({ pageType, setPageType }) => {
  return (
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
  );
};

export default ReportTypeSelector;
