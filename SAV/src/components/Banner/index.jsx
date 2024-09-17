import styled from "styled-components"
//import Buttton from "../Button"
import Button from '@mui/material/Button';
import ButtonP from "../Button";

const BannerEstilizado = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    background-image: url('/POSTRES.JPG');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
    
    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    background-color: rgba(0, 0, 0, 0.7); 
    z-index: 1; 
  }

  div {
    z-index: 2;
    display: flex;
    gap: 10px;
    width: 60%;
    flex-direction: column;
    align-items: center;
    color: white;
    h1 {
        font-size: 4vmax;
    }
    h2 {
        font-size: 3vmax;
        padding: 0px;
        margin: 0%;
    }
    p {
        font-weight: 500;
    }
  }
  
`

function Banner() {
    return (
        <>
            <BannerEstilizado>
                <div>
                    <h2>Restaurante</h2>
                    <h1>Antojitos Mary</h1>
                    <p>Uno de los restaurantes más prestigiosos de San Luis Potosí. Con precios accesibles y uno de los mejores servicios.</p>
                    <ButtonP texto={"menú"} size={"large"} ruta={"/menu"} />
                </div>

            </BannerEstilizado>
        </>
    )
}

export default Banner
