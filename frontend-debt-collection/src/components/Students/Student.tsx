import { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';
import { Link } from 'react-router-dom';

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoReceipt } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

export function Student() {


  interface Student {
    idstudent: number;
    name: string;
    lastname: string;
    status: boolean;
    idtutor: string;
  }

  const [list, setList] = useState<Student[]>([]);
  const [search, setSearch] = useState<string>('');

  const getStudent = async () => {
    await axios
      .get('http://localhost:5000/students')
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudent();
  }, []);

  function DeletStudent(id: number) {
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then(() => {
        setList((prevList) => prevList.filter((student) => student.idstudent !== id));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
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
          <h1>Lista de alumnos</h1>
          <Link to="/poststudents" className="add-parent">
            <IoIosAddCircle size="1rem" />
            <span>Agregar alumno</span>
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
            <h2>Estado</h2>
            <h2>Tutor</h2>
            <h2>Acciones</h2>
          </div>
          {filteredList.map((item) => (
            <div key={item.idstudent} className="parent-item">
              <p>{item.idstudent}</p>
              <p>{item.name}</p>
              <p>{item.lastname}</p>
              <p>{item.status ? "Entregó CF" : "Adeuda CF"}</p>
              <p>{item.idtutor}</p>
              <div className="parent-actions">
                <button className='act-btn'>
                  <MdModeEditOutline />
                </button>
                <Link to={`/feecalculate/${item.idstudent}`} className='act-btn'> 
                  <IoReceipt />
                </Link>
                <button className='act-btn' onClick={() => DeletStudent(item.idstudent)}>
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
