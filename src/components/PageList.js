import React, { useContext } from 'react';
import { ReportContext } from './context/ReportContext';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const PageList = () => {
  const { reportData, deletePage } = useContext(ReportContext);

  return (
    <Box 
      sx={{ 
        p: 2, 
        borderRadius: 2, 
        bgcolor: 'background.paper', 
        boxShadow: 2 
      }}
    >
      <Typography variant="h6">Páginas Agregadas</Typography>
      <List>
        {reportData.pages.length > 0 ? (
          reportData.pages.map((page, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => deletePage(index)}
                >
                  Eliminar
                </Button>
              }
            >
              <ListItemText primary={page.title} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">No hay páginas agregadas.</Typography>
        )}
      </List>
    </Box>
  );
};

export default PageList;
