import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Fees.css";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

interface Fee {
  idfee: number;
  formatted_date: string;
  fee_on_time: number;
}

interface FeeHist {
  datefee: string;
  formatted_date: string;
  fee_on_time: number;
}

export function Fees() {
  const [fee, setFee] = useState<Fee[]>([]);
  const [feeHist, setFeeHist] = useState<FeeHist[]>([]);

  const getFee = async () => {
    try {
      const response = await axios.get("http://localhost:5000/feeMax");
      console.log(response.data);
      setFee(response.data);
    } catch (error) {
      console.error("Error fetching fee data:", error);
    }
  };

  const getFeeHist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/feesHist");
      console.log(response.data);
      setFeeHist(response.data);
    } catch (error) {
      console.error("Error fetching fee history:", error);
    }
  };

  const DeleteFee = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/fees/${id}`);
      getFee();
      getFeeHist();
    } catch (error) {
      console.error("Error deleting fee:", error);
    }
  };

  useEffect(() => {
    getFee();
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
                <button onClick={() => DeleteFee(item.idfee)}>
                  <MdDelete />
                </button>
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