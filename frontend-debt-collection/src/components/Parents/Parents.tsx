import { useState, useEffect } from 'react';
import axios from 'axios';
import './Parents.css';
import { Link } from 'react-router-dom';

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoReceipt } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";



export function Parents() {
  const [list, setList] = useState([])
  const getParents = async () => {
    await axios.get('http://localhost:5000/parents')
    .then((response) => {
      console.log(response.data)
      setList(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getParents()
  }, [])

  return (
    <>
      <div className="container-parent">
        <div className='parent-header'>
          <h1>Lista de padres e hijos</h1>
          <Link to='/postparents' className='add-parent'><IoIosAddCircle size='1rem'/><span>Agregar padre</span></Link>
        </div>
        <div className='filter-list'>
          <div className="search-name">
            <p>Buscar por nombre:</p>
            <input type="text" name="search" id="search" placeholder="Buscar por nombre" />
          </div>
          <div className='select-list'>
            <p>Buscar por estado de cuota:</p>
            <select name="filter" id="filter">
              <option value="name">Pagadas</option>
              <option value="lastname">Pendientes</option>
              <option value="address">Vencidas</option>
            </select>
            </div>
        </div>
        <div className="list-parent">
          <div className="parent-header">
            <h2>Nombre</h2>
            <h2>Apellido</h2>
            <h2>Dirección</h2>
            <h2>Email</h2>
            <h2>Teléfono</h2>
            <h2>Hijos</h2>
            <h2>Acciones</h2>
          </div>
          {list.map((item) => (
            <div key={item.idparent} className="parent-item">
              <p>{item.name}</p>
              <p>{item.lastname}</p>
              <p>{item.address}</p>
              <p>{item.email}</p>
              <p>{item.celnumb}</p>
              <p>{item.childrenCount||'2'}</p>
              <div className="parent-actions">
                <button><FaChild /></button>
                <button><MdModeEditOutline /></button>
                <button><IoReceipt /></button>
                <button><MdDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

