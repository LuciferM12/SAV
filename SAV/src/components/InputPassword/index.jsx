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

function InputPassword({ name, placeholder, color }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ width: 500, maxWidth: '100%' }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        color='secondary'
                        sx={{
                            color: 'gray',
                            '&:hover': {
                                color: 'white !important', // Cambia a blanco en hover
                            },
                        }}
                    >
                        {placeholder}
                    </InputLabel>
                    <CustomOutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        fullWidth
                        color={color}
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
                        label={placeholder}
                    />
                </FormControl>
            </Box>
        </ThemeProvider>
    );
}

export default InputPassword;