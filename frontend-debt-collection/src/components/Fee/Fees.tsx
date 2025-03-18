import { Link } from "react-router-dom";
import "./Fees.css";

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

export function Fees() {
  return (
    <>
    <div className="container-fee">
      <div className="fee-header">
        <h1>Valor cuota vigente</h1>
        <button className='add-fee'><IoIosAddCircle size='1rem'/><span>Agregar Cuota</span></button>
      </div>
      <div className="list-fee">
        <div className="fee-header">
          <h2>Fecha Cuota</h2>
          <h2>Monto</h2>
          <h2>Acciones</h2>
        </div>
        <div className="fee-item">
          <p>Fecha</p>
          <p>Monto</p>
          <div className="fee-actions">
            <button><MdModeEditOutline /></button>
            <button><MdDelete /></button>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fee-historical">
      <h1>Listado historico precio</h1>
      <div className="list-fee">
        <div className="fee-header">
          <h2>Id Cuota</h2>
          <h2>Fecha monto</h2>
          <h2>Monto</h2>
        </div>
      </div>
    </div>
    </>
  );
}