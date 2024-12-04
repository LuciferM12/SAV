'use client'
import Banner from "@/components/banners/Banner";
import { useEffect, useState, useRef } from "react";
import { getCategories, getImagenBanner, getProducts } from "./actions";
import Historia from "@/components/sections/historia/Historia";
import Catalogo from "@/components/catalogue/Catalogo";
import Reservaciones from "@/components/sections/reservaciones/Reservaciones";
import Opiniones from "@/components/sections/opiniones/Opiniones";
import LoadingScreen from "@/components/loading/loading";
import { toast, Toaster } from "sonner";
import { useSession } from "../context/sesiones/SessionContext";

export default function Index() {
  const { user } = useSession()
  const [image, setImage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setIsLoadingCategories(true)
      setIsLoadingProducts(true)
      const logo = await getImagenBanner()
      setImage(logo)
      setIsLoading(false)
      const categorias = await getCategories()
      setCategorias(categorias)
      setIsLoadingCategories(false)
      const productos = await getProducts()
      setProductos(productos)
      setIsLoadingProducts(false)
    } catch (error) {
      toast.error('Error de carga')
    } finally {
      setIsLoadingCategories(false)
      setIsLoadingProducts(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <>
      <Banner
        tipo="Restaurante"
        titulo="Antojitos Mary"
        descripcion="Uno de los restaurantes más prestigiosos de San Luis Potosí. Con precios accesibles y uno de los mejores servicios."
        secundario={false}
        image={image}
      />
      <Historia />
      <h1 className='font-extrabold text-3xl text-center mb-6'>Productos Principales</h1>
      <Catalogo categories={categorias} productos={productos} isLoadingCategories={isLoadingCategories} isLoadingProducts={isLoadingProducts}/>
      <Reservaciones logged={!!user} />
      <Opiniones />
      <Toaster richColors theme="dark" />
    </>
  )
}