import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ texto, onChange, name = 'image', required, multiple = false }) {
    const [fileName, setFileName] = React.useState('');

    const handleChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            if (onChange) {
                onChange(event);
            }
        }
    };

    return (
        <div>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                {texto}
                <VisuallyHiddenInput
                    type="file"
                    name={name}
                    required={required}
                    onChange={handleChange}
                    multiple={multiple}
                    accept='image/*'
                />
            </Button>
            {fileName && <p style={{ marginTop: '8px' }}>Archivo seleccionado: {fileName}</p>}
        </div>
    );
}