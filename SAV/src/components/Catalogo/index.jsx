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
function Catalogo({ productos, categorias, titulo }) {
    const [value, setValue] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const categoria = categorias[value].nombre
        const productosFiltrados = productos.filter(p => p.categoria === categoria);
        setFilteredProducts(productosFiltrados);
    }, [value]);


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
                                    <Tab key={index} label={categoria.nombre} />
                                ))
                            }
                        </Tabs>
                    </Box>

                </ThemeProvider>
            </div>
            <ProductosEstilizados>
                {filteredProducts.map((product, index) => (
                    <Card key={index} nombre={product.nombre} precio={product.costo} imagen={product.foto} descripcion={product.descripcion} />
                ))}
            </ProductosEstilizados>

        </SectionEstilizado>
    )
}

export default Catalogo
