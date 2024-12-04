'use client'
import ButtonRender from '@/components/buttons/Button'
import CalendarReservation from '@/components/calendars/CalendarReservation'
import Stepper from '@/components/stepper/Stepper'
import TimePicker from '@/components/timepickers/TimePicker'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { createReservation, getHours } from './actions'

const Reservas = () => {
  const [loading, setLoading] = useState(true);
  const [isbusy, setIsBusy] = useState<boolean>(false)
  const [fechaReserva, setFechaReserva] = useState<string>("")
  const [currentStep, setCurrentStep] = useState(0)
  const [horas, setHoras] = useState([])
  const numberOfStep: number = 3
  const [hora, setHora] = useState<null | string>(null)

  const manejarSeleccionHora = (hora: string) => {
    setHora(hora)
  }

  const fetchData = async () => {
    try {
      const hours = await getHours()
      setHoras(hours)
      console.log(hours)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching profile data:", error)
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setIsBusy(true)
    if (!hora || !fechaReserva) {
      toast.error('Por favor, seleccione la fecha y la hora')
      setIsBusy(false)
      return
    }

    const result = await createReservation(hora, fechaReserva)
    setIsBusy(false)
    if (result.success) {
      toast.success('Reserva agendada correctamente')
    } else {
      toast.error('Error al realizar la reserva')
    }
  }

  function formatoAmigable(fechaString: string) {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const fecha = new Date(fechaString)
    const dia = fecha.getDate()
    const mes = meses[fecha.getMonth()]
    const anio = fecha.getFullYear()

    return `${dia} de ${mes} de ${anio}`
  }

  useEffect(() => {
    setHora(null)
  }, [fechaReserva])

  useEffect(() => {
    fetchData()
  }, [])

  const goToNextStep = () => setCurrentStep(prev => prev === numberOfStep - 1 ? prev : prev + 1)
  const goToPreviousStep = () => setCurrentStep(prev => prev <= 0 ? prev : prev - 1)

  return (
    <div className='p-24 w-full flex items-center justify-center flex-col gap-5 '>
      <h1 className='font-extrabold text-3xl text-center'>Agenda una reserva</h1>
      <Stepper numberOfSteps={numberOfStep} currentStep={currentStep} />
      {
        currentStep === 0 ?
          <>
            <p className='font-semibold'>Elija una fecha para su reserva</p>
            <CalendarReservation setFechaReserva={setFechaReserva} />
            {
              fechaReserva &&
              <p className='font-semibold'> Fecha seleccionada: {fechaReserva}</p>
            }
          </> : currentStep === 1 ?
            <>
              <p className='font-semibold'>Elija una hora para su reserva de las opciones disponibles</p>
              <TimePicker horas={horas} onSeleccionarHora={manejarSeleccionHora} />
              {
                hora &&
                <p className='font-semibold'> Hora seleccionada: {hora}</p>
              }
            </> :
            <>
              <div className='w-[500px] h-[300px]  dark:bg-gray-900 bg-gray-200 p-4 flex flex-col gap-5 rounded-3xl text-lg'>
                <h2 className='font-semibold text-center'>Tu reservación:</h2>
                <p>Dia: {formatoAmigable(fechaReserva)}</p>
                <p>Hora: {hora} </p>
                <ButtonRender variant={'default'} onClick={handleSubmit} text='Reservar' />
              </div>
            </>

      }

      <div className='flex justify-center gap-3'>
        {
          currentStep < numberOfStep - 1 &&
          <ButtonRender variant={'default'} text='Siguiente' onClick={goToNextStep} />
        }
        {
          currentStep !== 0 &&
          <ButtonRender variant={'secondary'} text='Anterior' onClick={goToPreviousStep} />
        }
      </div>
      <Toaster richColors theme='dark' />
    </div>
  )
}

export default Reservas