'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Option {
  value: string;
  label: string;
}

interface FlexibleSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  label?: string;
  name: string;
  className?: string;
}

export function FlexibleSelect({ 
  options, 
  onChange, 
  value, 
  placeholder = "Select an option", 
  label,
  name,
  className = "w-full"
}: FlexibleSelectProps) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-base font-medium text-gray-700 dark:text-white mb-1">
          {label}
        </label>
      )}
      <Select onValueChange={onChange} value={value} name={name}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className='text-white'>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
