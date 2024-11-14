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
        <div className="relative">
            <label htmlFor={id} className="mb-1 block">
                {label}
                {required && <span className="text-red-600"> *</span>}
            </label>
            <div className="flex items-center">
                <input
                    placeholder={placeholder}
                    type={isPasswordVisible ? 'text' : 'password'}
                    id={id}
                    name={name}
                    disabled={disabled}
                    required={required}
                    onChange={onChange}
                    className={`${className}`}
                    value={value}
                    {...optionalProps}
                />

                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="ml-2 text-2xl hover:text-gray-800 focus:outline-none"
                >
                    {isPasswordVisible ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </button>

            </div>
        </div>
    );
};

export default InputPassword;
