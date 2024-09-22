import React from 'react'
import styled from 'styled-components'

const FooterEstilizado = styled.footer`
    width: 100%;
    background-color: #110904;
    display: flex;
    flex-wrap: wrap;
    color: white;
    font-weight: 400;
    margin: 0;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    text-align: center;
    div {
        width: 30%;
        height: 30px;
        min-width: 300px;
    }
`

function Footer() {
    return (
        <FooterEstilizado>
            <div>
                Correo: antojitosmary@gmail.com
            </div>
            <div>
                Llamanos: 44444444
            </div>
            <div>
                Nuestra dirección: Francisco González
            </div>
        </FooterEstilizado>
    )
}

export default Footer
