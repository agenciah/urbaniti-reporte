import React, { useContext } from 'react';
import { ReportContext } from './context/ReportContext';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MonthSelector = () => {
  const { reportData, setReportData } = useContext(ReportContext);

  const handleMonthChange = (e) => {
    setReportData({ ...reportData, month: e.target.value });
  };

  return (
    <FormControl fullWidth margin="normal" sx={{ maxWidth: 300 }}>
      <InputLabel>Selecciona un mes</InputLabel>
      <Select
        value={reportData.month}
        onChange={handleMonthChange}
        label="Selecciona un mes"
      >
        <MenuItem value="ENERO">Enero</MenuItem>
        <MenuItem value="FEBRERO">Febrero</MenuItem>
        <MenuItem value="MARZO">Marzo</MenuItem>
        <MenuItem value="ABRIL">Abril</MenuItem>
        <MenuItem value="MAYO">Mayo</MenuItem>
        <MenuItem value="JUNIO">Junio</MenuItem>
        <MenuItem value="JULIO">Julio</MenuItem>
        <MenuItem value="AGOSTO">Agosto</MenuItem>
        <MenuItem value="SEPTIEMBRE">Septiembre</MenuItem>
        <MenuItem value="OCTUBRE">Octubre</MenuItem>
        <MenuItem value="NOVIEMBRE">Noviembre</MenuItem>
        <MenuItem value="DICIEMBRE">Diciembre</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
