import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function InputSelect({ placeholder, width = 500, maxWidth = "100%", disabled = false, required = false, value, onChange, options, name }) {
    return (
        <Box sx={{ width: width, maxWidth: maxWidth }}>
            <FormControl
                fullWidth
                required={required}
                disabled={disabled}
                sx={{ m: 1, minWidth: 80 }}
            >
                <InputLabel id="demo-simple-select-autowidth-label">{placeholder}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={onChange}
                    name={name}
                    autoWidth
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
                </Select>
            </FormControl>
        </Box>
    );
}
