import React from 'react'
import styled from 'styled-components'
import ImgHistoria from '/main.jpg'
import ButtonP from '../Button'
import { useSession } from '../../context/SessionContext'


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
  
  @media (max-width: 480px) {
    padding: 20px;
  }

  img {
    width: 70%;
    border-radius: 10px;

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  div {
    width: 48%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    p {
      line-height: 1.5;
      font-weight: 300;
    }

    @media (max-width: 1420px) {
        width: 100%;
    }

    
  }
`
const ContenedorSecundario = styled.article`
  width: 80%;
  display: flex;  
  flex-wrap: wrap;

  @media (max-width: 480px) {
    width: 100%;
  }
`


function Reserva() {
    const { user } = useSession()
    return (
        <SectionEstilizado>
            <ContenedorSecundario>
                <div>
                    <img src={ImgHistoria} alt='local' />
                </div>
                <div>
                    <h1>Reserva</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore consequuntur voluptas fugit, repudiandae cumque pariatur error fuga sunt excepturi cupiditate ullam, inventore similique quasi laudantium, aspernatur officiis quae sequi? Eligendi accusamus maiores ullam ab pariatur quas obcaecati reprehenderit. Necessitatibus sequi incidunt, dolor ipsam aliquid quod placeat? Perspiciatis quaerat fugit laudantium expedita. Illum enim optio neque ipsam exercitationem voluptate architecto! Id ratione earum iste provident aliquam hic assumenda, repellendus ipsum et sint laboriosam impedit autem illo architecto porro atque </p>
                    {
                        !user ?
                            <ButtonP texto={"Inicia Sesión"} ruta={"/login"} />
                            :
                            <ButtonP texto={"RESERVA YA"} ruta={"/reserva"} />
                    }

                </div>

            </ContenedorSecundario>
        </SectionEstilizado>
    )
}

export default Reserva
