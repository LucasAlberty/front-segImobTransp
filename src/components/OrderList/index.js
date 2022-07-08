import React, { useEffect, useState } from "react";
import "./index.css";
import Axios from "axios";

export function OrderList() {
  const [listOrders, setListOrders] = useState();
  const [filteredList, setFilteredList] = useState(listOrders);

  useEffect(() => {
    Axios.get("http://localhost:3001/getOrders").then((response) => {
      setListOrders(response.data);
    });
  }, []);

  const handleDoneOrder = (codOrder, editStatus) => {
    Axios.put("http://localhost:3001/edit", { codOrder, editStatus });
    window.location.reload();
  };

  const handleCancelOrder = (codOrder) => {
    Axios.delete(`http://localhost:3001/delete/${codOrder}`);
    window.location.reload();
  };

  const handleFilterOpened = () => {
    const list = listOrders.filter((item) => item.STATUS == "A");
    setFilteredList(list);
  };
  const handleFilterFinished = () => {
    const list = listOrders.filter((item) => item.STATUS == "F");
    setFilteredList(list);
  };

  return (
    <div className="orderList--container">
      <div className="button--filter">
        <button onClick={handleFilterOpened}>Em aberto</button>
        <button onClick={handleFilterFinished}>Finalizado</button>
      </div>

      {typeof filteredList !== "undefined" &&
        filteredList.map((value) => {
          return (
            <div key={value.COD_ORDER} className="list--order">
              <div className="card--order">
                <p>COD: {value.COD_ORDER}</p>
                <div className="line--order">
                  <p className="route--order">
                    ROTA: {value.ORIGIN.toUpperCase()}/
                    {value.DESTINY.toUpperCase()}
                  </p>
                </div>
                <div className="line--order">
                  <p>
                    DIMENSÔES: ALTURA: {value.HEIGHT}m / LARGURA: {value.WIDTH}m
                    / COMPRIMENTO: {value.LENGTH}m
                  </p>
                </div>
                <div className="line--order">
                  <p>TIPO DE TRANSPORTE: {value.TYPETRANSP.toUpperCase()}</p>
                </div>
                <div className="line--order">
                  <p>RESPONSÁVEL: {value.RESPONSIBLE.toUpperCase()}</p>
                </div>
                <div className="line--order">
                  <p>DATA DE SAÍDA: {value.DATEOUT} / </p>
                  <p>
                    STATUS: {value.STATUS === "A" ? "EM ABERTO" : "FINALIZADO"}
                  </p>
                </div>
                <div className="line--order">
                  <p>VALOR TOTAL: R${value.TOTALPRICE.toFixed(2)} </p>
                </div>
                <div className="btn--container">
                  {value.STATUS !== "F" && (
                    <button
                      onClick={() => handleDoneOrder(value.COD_ORDER, "F")}
                    >
                      Finalizar
                    </button>
                  )}
                  {value.STATUS !== "F" && (
                    <button onClick={() => handleCancelOrder(value.COD_ORDER)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
