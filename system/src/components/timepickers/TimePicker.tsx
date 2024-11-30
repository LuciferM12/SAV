'use client';

import React, { useState } from 'react';

interface HorarioProps {
  horas: string[]; // Array de horas en formato string
  onSeleccionarHora: (hora: string) => void; // Callback para manejar la hora seleccionada
}

const TimePicker = ({ horas, onSeleccionarHora } : HorarioProps) => {
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

  const seleccionarHora = (hora: string) => {
    setHoraSeleccionada(hora);
    onSeleccionarHora(hora); // Llamamos al callback con la hora seleccionada
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 w-full">
      {horas.map((hora) => (
        <button
          key={hora}
          onClick={() => seleccionarHora(hora)}
          className={`p-4 text-sm font-bold shadow-md shadow-gray-900 rounded-lg border transition-all ${
            horaSeleccionada === hora
              ? 'bg-blue-500 text-white border-blue-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
          }`}
        >
          {hora}
        </button>
      ))}
    </div>
  );
};

export default TimePicker;
