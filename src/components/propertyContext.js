import { createContext } from "react";

const property = {
  price: "",
  refact: "",
  contacto: "",
  descripcion: "",
  ultimaVisita: "",
};

export const propertyContext = createContext(property);
