import React, { useState } from 'react';
import { InputProps } from './types';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const InputPassword = ({
    placeholder,
    min,
    max,
    minlength,
    maxlength,
    label,
    id,
    className,
    classNameDiv,
    name,
    required = false,
    disabled = false,
    onChange,
    value,
}: Omit<InputProps, 'type'>) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const optionalProps = {
        ...(min !== undefined && { min }),
        ...(max !== undefined && { max }),
        ...(minlength !== undefined && { minLength: minlength }),
        ...(maxlength !== undefined && { maxLength: maxlength }),
    };

    return (
        <div className={`${classNameDiv} relative`}>
            <label htmlFor={id} className="mb-1 block">
                {label}
                {required && <span className="text-red-600"> *</span>}
            </label>
            <div className="relative">
                <input
                    placeholder={placeholder}
                    type={isPasswordVisible ? 'text' : 'password'}
                    id={id}
                    name={name}
                    disabled={disabled}
                    required={required}
                    onChange={onChange}
                    className={`w-full pr-10 ${className}`}
                    value={value}
                    {...optionalProps}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {isPasswordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </button>
            </div>
        </div>
    );
};

export default InputPassword;
