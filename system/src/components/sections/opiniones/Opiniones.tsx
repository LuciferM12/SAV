import React from 'react'
import { Card } from './cards/Card'

const Opiniones = () => {
  return (
    <section className='w-full min-h-52 flex p-12 box-border gap-3 items-center justify-center flex-col text-center md:p-5'>
        <h1 className='font-extrabold text-3xl mb-1'>Opiniones</h1>
        <div className='w-full flex items-center justify-evenly flex-wrap gap-8'>
            <Card usuario={'Iguano'} stars={4} descripcion={"El mejor sazón casero que he probado, todo está delicioso. ¡Mis favoritos son los tacos de guisado!"} />
            <Card usuario={'Albertolt'} stars={3} descripcion={"El ambiente es súper acogedor, y la atención es excelente. Definitivamente vuelvo pronto"} />
            <Card usuario={'ENMP'} stars={5} descripcion={'Las salsas son increíbles, y los platillos tienen ese sabor auténtico que te hace sentir como en casa.'} />
        </div>
    </section>
  )
}

export default Opiniones