import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Logo from '/AM_Logo.png';
import FormRender from '../../components/FormRender';
import Authorizer from '../../components/Authorizer';
import { Toaster, toast } from 'sonner'

const Registrar = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 100px;
    box-sizing: border-box;
`;

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
`;

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function AltaProducto() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${URL}/categorias`);
                const result = response.data;
                const categoryOptions = result.map(cat => ({
                    value: cat.id_cat,
                    label: cat.descripcion
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
    ];

    const handleSubmit = async (formValues) => {
        const formData = new FormData();

        formData.append('producto', formValues.producto);
        formData.append('precio', formValues.precio);
        formData.append('description', formValues.description);
        formData.append('categoria', formValues.categoria);

        if (formValues.image instanceof File) {
            formData.append('imagen', formValues.image);
        } else {
            toast.error('Por favor seleccione una imagen')
            return;
        }

        try {
            const response = await fetch(`${URL}/productos`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Producto registrado con éxito')
            } else {
                toast.error(`Error al registrar producto: ${result.message}`)
            }
        } catch (error) {
            toast.error('Ocurrió un error al enviar el formulario.')
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
            <Toaster theme='dark' position='bottom-right' richColors />
        </Authorizer>
    )
}

export default AltaProducto;