import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import { ThemeProvider } from '@mui/material';
import Theme from '../../utils/Theme';
import Card from '../Card';

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
  text-align: center;
  @media (max-width: 480px) {
    padding: 20px;
  }
`

const ProductosEstilizados = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    

`
function Catalogo({ productos, categorias, titulo, value, setValue, caso = 1 }) {
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (categorias && categorias.length > 0) {
            // Asumiendo que categorias es un array de objetos con { categoria: 'nombre_categoria' }
            const categoriaActual = categorias[value]?.categoria;
            if (categoriaActual) {
                if (caso === 1) {
                    const productosFiltrados = productos.filter(p => p.categoria === categoriaActual);
                    setFilteredProducts(productosFiltrados);
                } else {
                    const productosFiltrados = productos.filter(p => p.tipo === categoriaActual);
                    setFilteredProducts(productosFiltrados);
                }

            }
        }
    }, [value, categorias, productos]);

    if (!categorias || categorias.length === 0) {
        return <div>Cargando categorías...</div>;
    }


    return (
        <SectionEstilizado>
            <h1>{titulo}</h1>
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
                            {
                                categorias.map((categoria, index) => (
                                    <Tab key={index} label={categoria.categoria} />
                                ))
                            }
                        </Tabs>
                    </Box>

                </ThemeProvider>
            </div>
            <ProductosEstilizados>
                {filteredProducts.map((product, index) => (
                    <Card key={index} nombre={product.nombre_producto} precio={product.precio} imagen={product.image} descripcion={product.descripcion} />
                ))}
            </ProductosEstilizados>

        </SectionEstilizado>
    )
}

export default Catalogo
