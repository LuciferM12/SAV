import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../../utils/Theme';


function ButtonP({ texto, color = "primary", ruta, variant = "contained", size, startIcon, endIcon, handleSubmit, type }) {
    return (
        <ThemeProvider theme={Theme}>
            {ruta ?
                <Button
                    variant={variant}
                    size={size}
                    color={color}
                    component={Link}
                    startIcon={startIcon ? startIcon : null}
                    endIcon={endIcon ? endIcon : null}
                    to={ruta}
                >
                    {texto}
                </Button>
                :
                <Button
                    variant={variant}
                    size={size}
                    color={color}
                    startIcon={startIcon ? startIcon : null}
                    endIcon={endIcon ? endIcon : null}
                    onClick={handleSubmit}
                    type={type}
                >
                    {texto}
                </Button>
            }

        </ThemeProvider>

    )
}

export default ButtonP
