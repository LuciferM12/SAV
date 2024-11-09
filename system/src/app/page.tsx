'use client'
import Banner from "@/components/banners/Banner";
import { useEffect, useState } from "react";
import { getCategories, getImagenBanner, getProducts } from "./actions";
import Historia from "@/components/sections/Historia";
import Catalogo from "@/components/catalogue/Catalogo";

export default function Index() {

  const [image, setImage] = useState<string | null>(null);
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getImagenBanner()
            setImage(logo)
        }

        const fetchCategories = async () => {
          const categorias = await getCategories()
          setCategorias(categorias)
        }

        const fetchProducts = async () => {
          const productos = await getProducts()
          setProductos(productos)
        }

        fetchLogo()
        fetchCategories()
        fetchProducts()
    }, [])

  return (
    <>
      <Banner 
        tipo="Restaurante" 
        titulo="Antojitos Mary"
        descripcion="Uno de los restaurantes más prestigiosos de San Luis Potosí. Con precios accesibles y uno de los mejores servicios."
        secundario={false}
        image= {image}
      />
      <Historia />
      <Catalogo categories={categorias} productos={productos}/>
    </>
  )
}
