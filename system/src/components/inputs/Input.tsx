'use client'
import React from 'react'
import { InputProps } from './types';

const Input = ({ placeholder, type = 'text', min, max, minlength, maxlength, label, id, className, classNameDiv, name, required = false, disabled = false, onChange, value }: InputProps) => {
    const optionalProps = {
        ...(min !== undefined && { min }),
        ...(max !== undefined && { max }),
        ...(minlength !== undefined && { minLength: minlength }),
        ...(maxlength !== undefined && { maxLength: maxlength }),
    };

    return (
        <div className={`flex flex-col gap-1 ${classNameDiv}`}>
            <label htmlFor={id}>
                {label}
                {required === true && <span className='text-red-600'> *</span>}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                name={name}
                disabled={disabled}
                required={required}
                onChange={onChange}
                className={className}
                {...optionalProps}
                value={value}
            />
        </div>
    )
}

export default Input