'use client'
import React, { useState, useEffect } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { toast } from "sonner";

interface CalendarioProps {
    setFechaReserva: (date: string) => void
}

const Calendario = ({setFechaReserva}: CalendarioProps) => {
    const [fecha, setFecha] = useState<Date>(new Date());
    const [mesActual, setMesActual] = useState<number>(fecha.getMonth());
    const [anioActual, setAnioActual] = useState<number>(fecha.getFullYear());
    const [dias, setDias] = useState<JSX.Element[]>([]);

    const meses: string[] = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const actualizarCalendario = () => {
        const primerDiaDelMes = new Date(anioActual, mesActual, 1).getDay();
        const ultimoDiaDelMes = new Date(anioActual, mesActual + 1, 0).getDate();
        const ultimoDiaSemanaDelMes = new Date(anioActual, mesActual, ultimoDiaDelMes).getDay();
        const ultimoDiaDelUltimoMes = new Date(anioActual, mesActual, 0).getDate();

        const liTags: JSX.Element[] = [];
        // Días del mes anterior
        for (let i = primerDiaDelMes; i > 0; i--) {
            liTags.push(
                <li key={`prev-${i}`} className="text-gray-400 pointer-events-none p-2">
                    <span>{ultimoDiaDelUltimoMes - i + 1}</span>
                </li>
            );
        }
        // Días del mes actual
        for (let i = 1; i <= ultimoDiaDelMes; i++) {
            const esHoy =
                i === fecha.getDate() &&
                mesActual === new Date().getMonth() &&
                anioActual === new Date().getFullYear()
                    ? "bg-gray-900 text-white pointer-events-none"
                    : "";

            liTags.push(
                <li key={`current-${i}`} className="hover:cursor-pointer  p-2">
                    <span
                        className={`hover:bg-gray-200 flex justify-center items-center h-8 w-8 rounded-[100%] ${esHoy} p-2`}
                        data-dia={i}
                        data-mes={mesActual}
                        data-anio={anioActual}
                        onClick={() => seleccionarDia(i)}
                    >
                        {i}
                    </span>
                </li>
            );
        }
        // Días del siguiente mes
        for (let i = ultimoDiaSemanaDelMes; i < 6; i++) {
            liTags.push(
                <li key={`next-${i}`} className="flex items-center justify-center text-gray-400 pointer-events-none">
                    <span>{i - ultimoDiaSemanaDelMes + 1}</span>
                </li>
            );
        }

        setDias(liTags);
    };

    const seleccionarDia = (dia: number) => {
        const fechaSeleccionada = new Date(anioActual, mesActual, dia);
        const hoy = new Date();

        if (fechaSeleccionada > hoy) {
            const fechaSQL = `${anioActual}-${String(mesActual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
            setFechaReserva(fechaSQL);
            console.log("Fecha seleccionada:", fechaSQL);
        } else {
            toast.info('Debe seleccionar un dia posterior al actual.')
        }
    };

    const cambiarMes = (direccion: "prev" | "next") => {
        const nuevoMes = direccion === "prev" ? mesActual - 1 : mesActual + 1;

        if (nuevoMes < 0 || nuevoMes > 11) {
            const nuevaFecha = new Date(anioActual, nuevoMes, 1);
            setAnioActual(nuevaFecha.getFullYear());
            setMesActual(nuevaFecha.getMonth());
        } else {
            setMesActual(nuevoMes);
        }
    };

    useEffect(() => {
        actualizarCalendario();
    }, [mesActual, anioActual]);

    return (
        <div className="flex items-start justify-center w-[500px] xl:w-full">
            <div className="w-11/12 bg-white rounded-xl text-black h-full">
                <header className="flex items-center pt-6 px-7 pb-2 justify-between">
                    <div className="text-2xl font-semibold">{`${meses[mesActual]} ${anioActual}`}</div>
                    <div className="flex">
                        <span
                            id="prev"
                            className="h-10 w-10 flex justify-center items-center text-center from-neutral-700 text-3xl cursor-pointer rounded-[50%] hover:bg-gray-200"
                            onClick={() => cambiarMes("prev")}
                        >
                            <LuChevronLeft />
                        </span>
                        <span
                            id="next"
                            className="h-10 w-10 flex justify-center items-center text-center from-neutral-700 text-3xl cursor-pointer rounded-[50%] hover:bg-gray-200 -mr-2"
                            onClick={() => cambiarMes("next")}
                        >
                            <LuChevronRight />
                        </span>
                    </div>
                </header>
                <div className="p-5">
                    <ul className="grid grid-cols-7 mb-5 text-center font-semibold">
                        <li>Dom</li>
                        <li>Lun</li>
                        <li>Mar</li>
                        <li>Mié</li>
                        <li>Jue</li>
                        <li>Vie</li>
                        <li>Sáb</li>
                    </ul>
                    <ul className="grid grid-cols-7 mb-5 text-center font-normal">
                        {dias}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Calendario;
