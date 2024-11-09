import React from 'react'
import { Card } from './cards/Card'

const Opiniones = () => {
  return (
    <section className='w-full min-h-52 flex p-12 box-border gap-3 items-center justify-center flex-col text-center md:p-5'>
        <h1 className='font-extrabold text-3xl mb-1'>Opiniones</h1>
        <div className='w-full flex items-center justify-evenly flex-wrap gap-8'>
            <Card usuario={'Iguano'} stars={2} />
            <Card usuario={'Albertolt'} stars={1} />
            <Card usuario={'ENMP'} stars={5} />
        </div>
    </section>
  )
}

export default Opiniones