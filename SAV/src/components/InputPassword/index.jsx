import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material';
import Theme from '../../utils/Theme';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const CustomOutlinedInput = styled(OutlinedInput)({
    // Cambiar color del borde
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray !important', // Cambia a tu color deseado
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important', // Color del borde en hover
    },
    // Cambiar color del texto escrito
    '& .MuiInputBase-input': {
        color: 'white', // Cambia a tu color deseado
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white !important', // Color del label al hacer hover
    },
    '&.Mui-focused .MuiInputLabel-root': {
        color: 'white !important', // Color del label cuando está enfocado
    },
});

function InputPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                {/* Usar FormControl para contener el label y el input */}
                <FormControl variant="outlined" fullWidth>
                    <InputLabel color='secondary' htmlFor="outlined-adornment-password" sx={{ color: 'gray' }}>
                        Password
                    </InputLabel>
                    <CustomOutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        color='secondary'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{ color: 'gray' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password" // Necesario para que el label se muestre
                    />
                </FormControl>
            </Box>
        </ThemeProvider>
    );
}

export default InputPassword;