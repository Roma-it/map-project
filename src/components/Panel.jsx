import React from 'react'
import { useRef, useEffect, useContext, useState } from "react";
import { propertyContext } from "./propertyContext";
import { activeContext } from './activeContext';
import { valueContext } from './valueContext';
import "./styles.css";

function Panel() {
    const { property } = useContext(propertyContext);
    const {active, setActive} = useContext(activeContext);
    const sideBar = useRef(null);
    const {value, setValue} = useContext(valueContext);
    const [validFields, setValidFields] = useState("")
    
    useEffect(() => {
        const btn = document.getElementById("btn");
        const nombreCompleto = document.getElementById("nombreCompleto");
        const telefono = document.getElementById("telefono");
        const email = document.getElementById("email");
        const precio = document.getElementById("precio");
 
        if(btn){
        btn.addEventListener("click", async (e)=>{
        e.preventDefault();
        if(!nombreCompleto.value || !telefono.value || !email.value || !precio.value){
            setValidFields("Todos los campos deben ser completados");
            return;
        }
        setActive(false);
        setValue(0);
        const data = {
            nombreCompleto : nombreCompleto.value,
            telefono: telefono.value,
            email: email.value,
            precio: precio.value
        }
        console.log(data)
        const res =  await fetch("http://localhost:8000/sales",{
            method:"POST",
            headers:{
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       }) 
    })
  }  
  setValidFields("");
}, [value])
    return (
      <div>
        {
        (value===0)?  
        (<div ref={sideBar} className={`side-bar ${active ? "show" : ""}`}>
            <p className="title">INFORMACION BÁSICA DE LA PARCELA</p>
            <div className="group">
                <p className="label">REFCAT</p>
                <p className="value">{property && property.refcat}</p>
            </div>
            <div className="group">
                <p className="label">CONTACTO</p>
                <p className="value">{property && property.contacto}</p>
            </div>
            <div className="group">
                <p className="label">ÚLTIMA VISITA</p>
                <p className="value">{property && property.lastVisit}</p>       
            </div>
            <div className="group">
                <p className="label">DESCRIPCIÓN</p>
                <p className="value">{property && property.description}</p>
            </div>
            <div className="group">
                <p className="label">PRECIO DE VENTA</p>
                <p className="value">{property && property.price}</p>
            </div>
            <button className="btn" onClick={()=>{setValue(1)}}>comprar</button>
        </div>) : 
        (
          <div ref={sideBar} className={`side-bar ${active ? "show" : ""}`}>
              <p className="title">INFORMACION BÁSICA DE LA PARCELA</p>
              <form id="form"className="form" action="">
                <label className="label strong" htmlFor="nombreCompleto">NOMBRE Y APELLIDOS DEL COMPRADOR</label>
                <input id="nombreCompleto" className="field" type="text" name="nombreCompleto" autoComplete="off"/>
                <label className="label strong" htmlFor="telefono">TELEFONO</label>
                <input id="telefono" className="field" type="number" name="telefono" autoComplete="off"/>
                <label className="label strong" htmlFor="email">CORREO ELECTRONICO</label>
                <input id="email" className="field" type="email" name="email" autoComplete="off"/>
                <label className="label strong" htmlFor="precio">PRECIO DE COMPRA</label>
                <input id="precio" className="field" type="number" name="precio" autoComplete="off"/>
                <p className="danger">{validFields}</p>
                <button className="btn" id="btn" >enviar</button>
              </form>
          </div>
        )
        }
      </div>
    )
}

export default Panel
