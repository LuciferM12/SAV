import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material';
import Theme from '../../../utils/Theme';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray !important',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important',
    },
    '& .MuiInputBase-input': {
        color: 'white !important',
    },
    '&.Mui-disabled .MuiInputBase-input': {
        color: 'white !important',
        WebkitTextFillColor: 'white !important' // Color del texto cuando está deshabilitado
    },
    '&:hover .MuiInputLabel-root': {
        color: 'white !important',
    },
    '&.Mui-focused .MuiInputLabel-root': {
        color: 'white !important',
    },
    '&.Mui-disabled .MuiInputLabel-root': {
        color: 'white !important', // Asegura que el label también se mantenga blanco
    },
}));

function InputPassword({ name, placeholder, color, width = 500, maxWidth = "100%", required = false, disabled = false, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <ThemeProvider theme={Theme}>
            <Box sx={{ width: width, maxWidth: maxWidth }}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel
                        htmlFor="outlined-adornment-password"
                        color='secondary'
                        sx={{
                            color: 'white !important',
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
                        required={required}
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
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