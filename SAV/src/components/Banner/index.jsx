import styled from "styled-components"
import ButtonP from "../Button";

const BannerEstilizado = styled.div`
    width: 100%;
    height: ${props => props.$height};
    display: flex;
    background-image: ${props => `url(${props.$imageurl})`};
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
        height: ${props => props.$height};
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

function Banner({ height = '90vh', image, tipo, titulo, descripcion, secundario = false }) {
    return (
        <BannerEstilizado $height={height} $imageurl={image}>
            <div>
                {
                    secundario ?
                        <h1>{titulo}</h1> :
                        <>
                            <h2>{tipo}</h2>
                            <h1>{titulo}</h1>
                            <p>{descripcion}</p>
                            <ButtonP texto={"Productos"} size={"large"} ruta={"/productos"} />
                        </>
                }
            </div>
        </BannerEstilizado>
    )
}

export default Banner
