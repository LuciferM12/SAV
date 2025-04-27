import { Inputs } from "./inputs"

export type FormObject = {
    [key: string]: Inputs['value']
}