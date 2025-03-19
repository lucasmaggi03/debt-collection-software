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
  interface Parent {
    idparent: number;
    name: string;
    lastname: string;
    address: string;
    email: string;
    phone: string;
    id_user: number;
  }

  const [list, setList] = useState<Parent[]>([]);
  const [search, setSearch] = useState<string>('');

  const getParents = async () => {
    await axios
      .get('http://localhost:5000/tutors')
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getParents();
  }, []);

  function DeletParent(id: number) {
    axios
      .delete(`http://localhost:5000/tutors/${id}`)
      .then(() => {
        setList((prevList) => prevList.filter((parent) => parent.idparent !== id));
      })
      .catch((error) => {
        console.error("Error deleting tutor:", error);
      });
  }

  const filteredList = list
    .filter((parent) =>
      parent.name.toLowerCase().includes(search.toLowerCase()) || parent.lastname.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="container-parent">
        <div className="parent-header">
          <h1>Lista de tutores</h1>
          <Link to="/postparents" className="add-parent">
            <IoIosAddCircle size="1rem" />
            <span>Agregar tutor</span>
          </Link>
        </div>
        <div className="filter-list">
          <div className="search-name">
            <p>Buscar por nombre:</p>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="select-list">
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
            <h2>Id</h2>
            <h2>Nombre</h2>
            <h2>Apellido</h2>
            <h2>Email</h2>
            <h2>Celular</h2>
            <h2>Acciones</h2>
          </div>
          {filteredList.map((item) => (
            <div key={item.idparent} className="parent-item">
              <p>{item.idtutor}</p>
              <p>{item.name}</p>
              <p>{item.lastname}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <div className="parent-actions">
                <button>
                  <FaChild />
                </button>
                <button>
                  <MdModeEditOutline />
                </button>
                <button>
                  <IoReceipt />
                </button>
                <button onClick={() => DeletParent(item.idparent)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
