'use client'
import Banner from "@/components/banners/Banner";
import { useEffect, useState } from "react";
import { getImagenBanner } from "./actions";
import Historia from "@/components/sections/Historia";

export default function Index() {

  const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getImagenBanner()
            setImage(logo)
        }
        fetchLogo()
    })

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
    </>
  )
}
