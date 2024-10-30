import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Logo from '/AM_Logo.png';
import FormRender from '../../components/FormRender'
import Authorizer from '../../components/Authorizer';
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
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${URL}/categorias`); // Usando axios para obtener categorías
                const result = response.data;
                const categoryOptions = result.map(cat => ({
                    value: cat.id_cat,    // Asumimos que el campo `id` es el identificador
                    label: cat.descripcion // Asumimos que `nombre` es el campo que quieres mostrar
                }));
                setCategorias(categoryOptions);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
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
            options: categorias
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
        <Authorizer allowedRoles={[7]}>
            <Registrar>
                <Divisor >
                    <img src={Logo} alt="logo" />
                    <h1>Nuevo Producto</h1>
                    <FormRender inputs={inputs} handleSubmit={handleSubmit} align='flex-start' width={200} />
                </Divisor>
            </Registrar>
        </Authorizer>
    )
}

export default AltaProducto