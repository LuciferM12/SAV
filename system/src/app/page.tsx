import ButtonRender from "@/components/buttons/Button";
import { DiProlog } from "react-icons/di";

export default function Index() {
  return (
    <ButtonRender 
      variant="default" 
      text="Iniciar Sesion"
      icon={<DiProlog />}
      loader
    />
  )
}
