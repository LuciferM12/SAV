'use client'
import Banner from "@/components/banners/Banner";
import { useEffect, useState } from "react";
import { getCategories, getImagenBanner, getProducts } from "./actions";
import Historia from "@/components/sections/historia/Historia";
import Catalogo from "@/components/catalogue/Catalogo";
import Reservaciones from "@/components/sections/reservaciones/Reservaciones";
import Opiniones from "@/components/sections/opiniones/Opiniones";
import LoadingScreen from "@/components/loading/loading";
import { toast, Toaster } from "sonner";

export default function Index() {

  const [image, setImage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const logo = await getImagenBanner()
      setImage(logo)
      const categorias = await getCategories()
      setCategorias(categorias)
      const productos = await getProducts()
      setProductos(productos)
    } catch (error) {
      toast.error('Error de carga')
    } finally {
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
      <Catalogo categories={categorias} productos={productos} />
      <Reservaciones />
      <Opiniones />
      <Toaster richColors theme="dark" />
    </>
  )
}