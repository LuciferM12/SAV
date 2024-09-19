import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import { ThemeProvider } from '@mui/material';
import Theme from '../../utils/Theme';

const productos = [
    { foto: 'foto1.jpg', nombre: 'Platillo 1', costo: 50, descripcion: 'Descripción 1', categoria: 'Platillos' },
    { foto: 'foto2.jpg', nombre: 'Platillo 2', costo: 70, descripcion: 'Descripción 2', categoria: 'Platillos' },
    { foto: 'foto3.jpg', nombre: 'Bebida 1', costo: 30, descripcion: 'Descripción 3', categoria: 'Bebidas' },
    { foto: 'foto4.jpg', nombre: 'Bebida 2', costo: 40, descripcion: 'Descripción 4', categoria: 'Bebidas' },
    // Más productos...
];

const SectionEstilizado = styled.section`
  width: 100%;
  min-height: 200px;
  display: flex;
  background-color: #110904;
  color: white;
  padding: 50px;
  box-sizing: border-box;
  gap: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
function Productos() {
    const [value, setValue] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // Filtrar productos en función de la pestaña seleccionada
        const categoria = value === 0 ? 'Platillos' : 'Bebidas';
        const productosFiltrados = productos.filter(p => p.categoria === categoria);
        setFilteredProducts(productosFiltrados);
    }, [value]);



    return (
        <SectionEstilizado>
            <h1>Principales Productos</h1>
            <div>
                <ThemeProvider theme={Theme}>
                    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: '#110904' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            textColor='primary'
                            indicatorColor='secondary'
                            aria-label="scrollable force tabs example"
                        >
                            <Tab label="Platillos" />
                            <Tab label="Bebidas" />
                            <Tab label="Bebidas" />
                            <Tab label="Bebidas" />
                            <Tab label="Bebidas" />
                            <Tab label="Bebidas" />
                        </Tabs>

                        <Box>
                            {filteredProducts.map((product, index) => (
                                <div key={index}>
                                    <p>{product.nombre}</p>
                                </div>
                            ))}
                        </Box>
                    </Box>
                </ThemeProvider>
            </div>

        </SectionEstilizado>
    )
}

export default Productos
