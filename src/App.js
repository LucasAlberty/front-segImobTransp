import React, { useState } from "react";
import "./App.css";
import { OrderList } from "./components/OrderList";
import Register from "./components/Register/index.js";

function App() {
  const [currentModule, setCurrentModule] = useState("OrderList");

  return (
    <div>
      <nav className="nav--bar">
        <button
          className="nav--button"
          onClick={() => setCurrentModule("OrderList")}
        >
          Lançamentos
        </button>
        <button
          className="nav--button"
          onClick={() => setCurrentModule("Register")}
        >
          Novo Registro
        </button>
      </nav>

      {currentModule === "OrderList" ? <OrderList /> : <Register />}
    </div>
  );
}

export default App;
