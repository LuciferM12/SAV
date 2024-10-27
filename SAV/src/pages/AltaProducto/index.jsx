import React from 'react'
import styled from 'styled-components'
import Logo from '/AM_Logo.png';
import FormRender from '../../components/FormRender'
import { Link } from 'react-router-dom';

const Registrar = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Divisor = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    color: white;
    img {
        width: 20%;
    }
`

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

function AltaProducto() {
    const inputs = [
        {
            placeholder: "Producto",
            color: "secondary",
            id: "producto",
            type: "text",
            name: "producto",
            required: true,
            width: 700
        },
        {
            placeholder: "Precio",
            color: "secondary",
            type: "number",
            name: "precio",
            id: "precio",
            required: true,
            width: 700
        },
        {
            placeholder: "Descripción",
            color: "secondary",
            id: "description",
            type: "text",
            name: "description",
            required: true,
            width: 700
        },
        {
            name: "categoria",
            placeholder: "Seleccione una categoria",
            type: "select",
            width: 700,
            maxWidth: "100%",
            disabled: false,
            required: true,
            options: [
                { value: 1, label: "Category 1" },
                { value: 2, label: "Category 2" },
                { value: 3, label: "Category 3" }
            ]
        },
        {
            placeholder: "Subir Imagen",
            color: "secondary",
            id: "image",
            type: "file",
            name: "image",
            required: true,
            width: 700
        },
        

    ]

    const handleSubmit = async (formValues) => {
        const formData = new FormData();

        // Añadir los campos al FormData
        formData.append('producto', formValues.producto);
        formData.append('precio', formValues.precio);
        formData.append('description', formValues.description);
        formData.append('categoria', formValues.categoria);
        formData.append('tipo', formValues.tipo);

        // Verificar que existe la imagen antes de intentar añadirla
        if (formValues.image instanceof File) {
            formData.append('imagen', formValues.image);
        } else {
            alert("Por favor seleccione una imagen");
            return;
        }

        try {
            const response = await fetch(`${URL}/productos`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Producto registrado con éxito');
                // Opcional: limpiar el formulario o redirigir
            } else {
                console.error(result.message);
                alert('Error al registrar producto: ' + result.message);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Ocurrió un error al enviar el formulario.');
        }
    };

    return (
        <>
            <Registrar>
                <Divisor >
                    <img src={Logo} alt="logo" />
                    <h1>Nuevo Producto</h1>
                    <FormRender inputs={inputs} handleSubmit={handleSubmit} align='flex-start' width={200} />
                </Divisor>
            </Registrar>
        </>
    )
}

export default AltaProducto