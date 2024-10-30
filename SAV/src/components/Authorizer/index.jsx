import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import styled from 'styled-components'
import { MdLock } from "react-icons/md";

const SectionEstilizado = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #110904;
  color: white;
  padding: 100px;
  box-sizing: border-box;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 480px) {
    padding: 20px;
  }

  &MdLock{
    font-size: 200px;
  }
`

const Restricted = ({ }) => {
    return (
        <SectionEstilizado>
            <h1><MdLock style={{ fontSize: '200px' }}/></h1>
            <h1>Restricted Access</h1>
            <p>Solicita acceso a tu administrador</p>
        </SectionEstilizado>
    )
}




const Authorizer = ({ children, allowedRoles = [] }) => {
    const navigate = useNavigate()
    const { user, loading } = useSession()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/')
        }
    }, [loading])

    return (
        <>
            {loading && <p>Loading...</p>}
            {
                user && allowedRoles.includes(user.rol) ?
                    children
                    :
                    user && !allowedRoles.includes(user.rol) ?
                        <Restricted />
                        :
                        null
            }
        </>
    )
}

export default Authorizer
