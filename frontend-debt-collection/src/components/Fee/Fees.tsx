import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./Fees.css";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

export function Fees() {
  const [fee, setFee] = useState([]);
  const getFee = async () => {
    await axios.get("http://localhost:5000/feeMax")
      .then((response) => {
        console.log(response.data);
        setFee(response.data);
      });
  };

  useEffect(() => {
    getFee();
  }, []);

  const [feeHist, setFeeHist] = useState([]);
  const getFeeHist = async () => {
    await axios.get("http://localhost:5000/fees")
      .then((response) => {
        console.log(response.data);
        setFeeHist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeeHist();
  }, []);

  return (
    <>
      <div className="container-fee">
        <div className="fee-h">
          <h1>Valor cuota vigente</h1>
          <button className="add-fee">
          <Link to="/postfee" className="add-fee">
            <IoIosAddCircle size="1rem" />
            <span>Agregar Cuota</span>
          </Link>
          </button>
        </div>
        <div className="list-fee">
          <div className="fee-header">
            <h2>Fecha Cuota</h2>
            <h2>Monto</h2>
            <h2>Acciones</h2>
          </div>
          {fee.map((item) => (
            <div key={item.idfee} className="fee-item">
              <p>{item.formatted_date}</p>
              <p>{item.fee_on_time}</p>
              <div className="fee-actions">
                <button><MdModeEditOutline /></button>
                <button><MdDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fee-historical">
        <h1>Listado historico precio</h1>
        <div className="list-fee">
          <div className="fee-header">
            <h2>Fecha monto</h2>
            <h2>Monto</h2>
          </div>
          {feeHist.map((item) => (
            <div key={item.datefee} className="fee-item">
              <p>{item.formatted_date}</p>
              <p>{item.fee_on_time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
