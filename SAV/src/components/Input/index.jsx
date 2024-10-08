import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material';
import Theme from '../../utils/Theme';
import styled from 'styled-components'

const TextFieldStyled = styled(TextField)({
  '& fieldset': {
    borderColor: 'gray', // Color del borde antes de ser clickeado
  },
  '& .MuiInputLabel-root': {
    color: 'gray', // Color del placeholder antes de estar enfocado
  },
  '& .MuiInputBase-input': {
    color: 'white', // Cambia este color al que desees
  },
  '&:hover fieldset': {
    borderColor: 'white !important', // Color del borde al hacer hover
  },
  '&:hover .MuiInputLabel-root': {
    color: 'white !important', // Color del label al hacer hover
  }
});



function Input({ placeholder, type = 'text', id, color, width = 500, maxWidth = '100%', name }) {
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
        />
      </Box>
    </ThemeProvider>
  )
}

export default Input
