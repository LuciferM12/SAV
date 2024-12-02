import { useCart } from '@/app/context/carrito/CartContext';
import { useSession } from '@/app/context/sesiones/SessionContext';
import ButtonRender from '@/components/buttons/Button';
import React from 'react';
import { FaCartPlus } from "react-icons/fa6";
import { toast } from 'sonner';

interface CardProps {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
}

const Card = ({ id, nombre, descripcion, imagen, precio }: CardProps) => {
    const { user } = useSession();
    const { agregarCarrito } = useCart();

    const handleAddToCart = () => {
        try {
            const producto = {
                id,
                nombre: nombre,
                precio: precio,
                cantidad: 1, // Cantidad inicial
            }
            agregarCarrito(producto);
            toast.success('Producto agregado al carrito')
        } catch (error) {
            toast.error('Ocurrió un error al agregar el producto')
        }
    }

    return (
        <div className="w-[30%] xl:w-[48%] md:w-full h-[450px] dark:bg-slate-800 bg-[#bfbfbf] flex flex-col rounded-xl text-center box-border">
            <div className="w-[100%] h-80 rounded-t-xl relative">
                <img
                    className="w-full h-full object-cover rounded-t-xl"
                    src={imagen}
                    alt={nombre}
                />
                <div className="absolute bottom-4 right-4">
                    {user && (
                        <ButtonRender
                            variant="secondary"
                            icon={<FaCartPlus className="mr-2 h-4 w-4" />}
                            text="Agregar"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleAddToCart} // Asignar la acción aquí
                        />
                    )}
                </div>
            </div>
            <div className="w-full h-16 flex items-center justify-center">
                <div className="bg-black text-white p-2 h-fit rounded flex items-center justify-center text-xl font-semibold box-border">
                    {`$${precio}`}
                </div>
            </div>
            <h3 className="m-1 font-semibold text-xl">{nombre}</h3>
            <p className="m-0 whitespace-nowrap font-normal py-1 px-3 overflow-hidden overflow-ellipsis">
                {descripcion}
            </p>
        </div>
    )
}

export default Card