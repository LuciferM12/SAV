import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider, styled } from '@mui/material';
import Theme from '../../utils/Theme';

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& fieldset': {
    borderColor: 'gray !important', // Color del borde antes de ser clickeado
  },
  '& .MuiInputLabel-root': {
    color: 'white !important', // Color del placeholder antes de estar enfocado
  },
  '& .MuiInputBase-input': {
    color: 'white !important', // Color del texto
  },
  '&:hover fieldset': {
    borderColor: 'white !important', // Color del borde al hacer hover
  },
  '&:hover .MuiInputLabel-root': {
    color: 'white !important', // Color del label al hacer hover
  },
  '& .Mui-disabled': {
    color: 'white !important', // Color del texto cuando el input está deshabilitado
    WebkitTextFillColor: 'white !important', // Asegura que el color funcione en navegadores WebKit
  },
}));

function Input({ placeholder, type = 'text', id, color, width = 500, maxWidth = '100%', name, required = true, disabled = false, value = "", onChange }) {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ width: width, maxWidth: maxWidth }}>
        <TextFieldStyled
          fullWidth
          label={placeholder}
          id={id}
          color={color}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Input;