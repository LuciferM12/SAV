import React from 'react'
import styled from 'styled-components'
import ImgHistoria from '/RESVOC.jpeg'


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


  img {
    width: 70%;
    border-radius: 10px;
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
`


function Historia() {
  return (
    <SectionEstilizado>
      <ContenedorSecundario>
        <div>
          <h1>Nosotros</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore consequuntur voluptas fugit, repudiandae cumque pariatur error fuga sunt excepturi cupiditate ullam, inventore similique quasi laudantium, aspernatur officiis quae sequi? Eligendi accusamus maiores ullam ab pariatur quas obcaecati reprehenderit. Necessitatibus sequi incidunt, dolor ipsam aliquid quod placeat? Perspiciatis quaerat fugit laudantium expedita. Illum enim optio neque ipsam exercitationem voluptate architecto! Id ratione earum iste provident aliquam hic assumenda, repellendus ipsum et sint laboriosam impedit autem illo architecto porro atque labore perspiciatis rem fugit animi minus! Ipsam incidunt nam laborum beatae veritatis sed tempore laudantium deserunt sit magni, dignissimos sint magnam nihil?</p>
        </div>
        <div>
          <img src={ImgHistoria} alt='local' />
        </div>
      </ContenedorSecundario>
    </SectionEstilizado>
  )
}

export default Historia
