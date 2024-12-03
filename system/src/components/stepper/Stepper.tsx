import React from 'react'
import { FaCheck } from "react-icons/fa";

interface StepperProps {
  currentStep: number,
  numberOfSteps: number
}

const Stepper = ({ currentStep, numberOfSteps }: StepperProps) => {
  const activeColor = (index: number) => currentStep >= index ? "bg-green-500" : "bg-gray-300"
  const isFinalStep = (index: number) => index === numberOfSteps - 1
  return (
    <div className='flex items-center'>
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-9 h-9 rounded-full flex items-center justify-center dark:text-black font-bold ${activeColor(index)}`} >
          {currentStep <= index  ? index + 1  : <FaCheck /> }  
          </div>
          {isFinalStep(index) ? null : <div className={`w-12 h-1 ${activeColor(index+1)}`}></div>}

        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper