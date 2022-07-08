import React, { useState } from "react";
import "./index.css";
import Axios from "axios";

function Register() {
  const [values, setValues] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  //Função de salvar dados fornecidos pelo usuário
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  //Função de calcular o frete
  const calculate = () => {
    if (values.typeTransp == undefined) return; //Caso não tenha setado o tipo de transporte não irar fazer o calculo
    setTotalPrice(() => {
      let typeTransp = values.typeTransp == "maritimo" ? 22 : 35; // Ternário para verificar qual tipo de transporte foi selecionado pelo usuário
      let volume = values.height * values.width * values.length; //Calculo de volume
      let calc = volume * typeTransp; // Valor total do frente
      return calc;
    });
  };

  //Função de registrar um novo lançamento no banco de dados
  const handleClickButton = () => {
    try {
      Axios.post("http://localhost:3001/register", {
        origin: values.origin,
        destiny: values.destiny,
        dateOut: values.dateOut,
        height: values.height,
        width: values.width,
        length: values.length,
        typeTransp: values.typeTransp,
        responsible: values.responsible,
        totalPrice: totalPrice,
      }).then((response) => console.log(response));
      alert("Lançamento resgistrado com sucesso!");
      console.log("Lançamento resgistrado com sucesso!");
    } catch (err) {
      alert("Erro ao registrar lançamento!", err);
      console.log(err);
    }
  };

  return (
    <div className="app--container">
      <div className="register--container">
        <h1 className="register--title">SITransp</h1>
        <div className="register--routes">
          <input
            type="text"
            name="origin"
            placeholder="Origem"
            className="register--input"
            onChange={handleChangeValues}
          />
          <input
            type="text"
            name="destiny"
            placeholder="Destino"
            className="register--input"
            onChange={handleChangeValues}
          />
        </div>
        <input
          type="date"
          name="dateOut"
          placeholder="Data de saída"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="number"
          name="height"
          placeholder="Altura"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="number"
          name="width"
          placeholder="Largura"
          className="register--input"
          onChange={handleChangeValues}
        />
        <input
          type="number"
          name="length"
          placeholder="Comprimento"
          className="register--input"
          onChange={handleChangeValues}
        />
        <select
          name="typeTransp"
          className="select--typetransp"
          onChange={handleChangeValues}
        >
          <option value="maritimo">Marítimo</option>
          <option value="rodoviario">Rodoviario</option>
        </select>
        <input
          type="text"
          name="responsible"
          placeholder="Responsável"
          className="register--input"
          onChange={handleChangeValues}
        />
        <h3 className="register--totalPrice">
          Valor total: R${totalPrice.toFixed(2)}
        </h3>

        <button className="register--button" onClick={calculate}>
          Calcular
        </button>
        <button className="register--button" onClick={handleClickButton}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Register;
