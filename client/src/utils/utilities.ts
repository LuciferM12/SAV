import { Inputs } from "@/types/inputs";
import { FormObject } from "@/types/objects";

export const getData = (inputs: Inputs[]) => {
    return inputs.reduce((data, input) => {
        data[input.name] = input.value
        return data
    }, {} as FormObject)
}

export const handleInputChange = (inputs: Inputs[], name: string, value: string) => {
    const inputIndex = inputs.findIndex(input => input.name === name)
    return inputs.map((input, index) => index === inputIndex ? { ...input, value: value } : input)
}