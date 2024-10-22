import React, { useState } from 'react';
import styled from 'styled-components';

const FormularioEst = styled.form`
    width: 100%;
    height: 100vh;
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    box-sizing: border-box;
    color: wheat;
`


function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Selecciona la imagen desde el input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage); // Agrega la imagen al FormData

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Image uploaded:', data);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <FormularioEst onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <button type="submit">Upload Image</button>
    </FormularioEst>
  );
}

export default ImageUpload;