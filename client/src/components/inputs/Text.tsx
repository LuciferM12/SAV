'use client'
import { InputsProps } from '@/types/inputs'
import React from 'react'

const Text = ({
  placeholder,
  name,
  value,
  required,
  disabled,
  id,
  label,
  className,
  maxLength,
  onChange
}: InputsProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={id}>
        {label}
        {required && !disabled && <span className='text-red-600'> *</span>}
      </label>
      <input
        className={`bg-transparent w-full outline-none p-2 ${className}`}
        value={value as string}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete='off'
        maxLength={maxLength}
        disabled={disabled}
        onChange={(e) => onChange(e.target.name, e.target.value)}
      >
      </input>
    </div>
  )
}

export default Text