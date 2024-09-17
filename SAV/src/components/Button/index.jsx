import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown, deepOrange } from '@mui/material/colors';


const theme = createTheme({
    palette: {
        primary: {
            main: deepOrange[500],
        },
        secondary: {
            main: brown[500],
        }
    }
})

function ButtonP({ texto, color = "primary", ruta, variant = "contained", size, icon }) {
    return (
        <ThemeProvider theme={theme}>
            <Button
                variant={variant}
                size={size}
                color={color}
                component={Link}
                to={ruta}
            >
                {texto}
            </Button>
        </ThemeProvider>

    )
}

export default ButtonP
