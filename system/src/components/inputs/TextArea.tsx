'use client'

import React from 'react'
import { TextAreaProps } from './types'

const TextArea = ({ 
    placeholder, 
    label, 
    id, 
    className, 
    classNameDiv, 
    name, 
    required = false, 
    disabled = false, 
    onChange, 
    value,
    rows = 3,
    cols,
    minlength,
    maxlength
}: TextAreaProps) => {
    const optionalProps = {
        ...(cols !== undefined && { cols }),
        ...(minlength !== undefined && { minLength: minlength }),
        ...(maxlength !== undefined && { maxLength: maxlength }),
    };

    return (
        <div className={`flex flex-col gap-1 ${classNameDiv}`}>
            <label htmlFor={id}>
                {label}
                {required === true && <span className='text-red-600'> *</span>}
            </label>
            <textarea
                placeholder={placeholder}
                id={id}
                name={name}
                disabled={disabled}
                required={required}
                onChange={onChange}
                className={className}
                value={value}
                rows={rows}
                {...optionalProps}
            />
        </div>
    )
}

export default TextArea
