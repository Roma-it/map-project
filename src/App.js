import React from "react";
import Map from "./components/Map";
import { useState } from "react";
import { propertyContext } from "./components/propertyContext";
import { activeContext } from "./components/activeContext";
import { valueContext } from "./components/valueContext";

function App(props) {
  const [property, setProperty] = useState({});
  const [active, setActive] = useState();
  const [value, setValue] = useState(0);
  return (
    <propertyContext.Provider value={{ property, setProperty }}>
      <activeContext.Provider value={{ active, setActive }}>
        <valueContext.Provider value={{ value, setValue }}>
          <Map />
        </valueContext.Provider>
      </activeContext.Provider>
    </propertyContext.Provider>
  );
}

export default App;
