'use client'
import Banner from "@/components/banners/Banner";
import { useEffect, useState } from "react";
import { getCategories, getImagenBanner, getImagenNosotros, getImagenReserva, getInformacion, getProducts } from "./actions";
import Historia from "@/components/sections/historia/Historia";
import Catalogo from "@/components/catalogue/Catalogo";
import Reservaciones from "@/components/sections/reservaciones/Reservaciones";
import Opiniones from "@/components/sections/opiniones/Opiniones";
import LoadingScreen from "@/components/loading/loading";
import { toast, Toaster } from "sonner";
import { useSession } from "../context/sesiones/SessionContext";

interface Info {
  nosotros: string
  descripcion: string
  tipo: string
  nombre: string
  reservastext: string
}


export default function Index() {
  const { user } = useSession()
  const [image, setImage] = useState<string | null>(null);
  const [imageRes, setImageRes] = useState<string | null>(null);
  const [imageNos, setImageNos] = useState<string | null>(null);
  const [informacion, setInformacion] = useState<Info | null>(null)
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
      const banner = await getImagenBanner()
      setImage(banner)
      const nosImg = await getImagenNosotros()
      setImageNos(nosImg)
      const resImg = await getImagenReserva()
      setImageRes(resImg)
      const inf = await getInformacion()
      setInformacion(inf)
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
        tipo={informacion ? informacion.tipo : ""}
        titulo={informacion ? informacion.nombre : ""}
        descripcion={informacion ? informacion.descripcion : ""}
        secundario={false}
        image={image}
      />
      <Historia historia={informacion ? informacion.nosotros : ""} imgNos={imageNos ? imageNos : ""}/>
      <h1 className='font-extrabold text-3xl text-center mb-6'>Productos Principales</h1>
      <Catalogo categories={categorias} productos={productos} isLoadingCategories={isLoadingCategories} isLoadingProducts={isLoadingProducts}/>
      <Reservaciones logged={!!user} imgRes={imageRes ? imageRes : ""} reservacionesText={informacion ? informacion.reservastext : ""} />
      <Opiniones />
      <Toaster richColors theme="dark" />
    </>
  )
}