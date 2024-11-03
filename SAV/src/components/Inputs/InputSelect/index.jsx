import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray !important', // Borde gris
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important', // Borde blanco al hacer hover
    },
    '& .MuiInputBase-input': {
        color: 'white !important', // Texto blanco
    },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    color: 'white !important', // Color del label
    '&.Mui-focused': {
        color: 'white !important', // Mantener blanco cuando está enfocado
    },
    '&.Mui-disabled': {
        color: 'white !important', // Asegura que el label también se mantenga blanco si está deshabilitado
    },
}));

export default function InputSelect({ placeholder, width = 500, maxWidth = "100%", disabled = false, required = false, value, onChange, options, name }) {
    return (
        <Box sx={{ width: width, maxWidth: maxWidth }}>
            <FormControl
                fullWidth
                required={required}
                disabled={disabled}
                sx={{ m: 1, minWidth: 80 }}
            >
                <CustomInputLabel id="demo-simple-select-autowidth-label">{placeholder}</CustomInputLabel>
                <CustomSelect
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={onChange}
                    name={name}
                    label={placeholder}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options && options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        </Box>
    );
}
