import axios from "axios";
import { useState } from "react";
import "./PostStudent.css";

export function PostStudent() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState(0);
    const [idtutor, setIdtutor] = useState<number | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/students", {
                name,
                lastname,
                birth,
                phone,
                address,
                status,
                idtutor: idtutor ?? null,
            });
            setName("");
            setLastname("");
            setBirth("");
            setPhone("");
            setAddress("");
            setStatus(0);
            setIdtutor(null);
        } catch (error) {
            console.error("Error al agregar alumno:", error);
        }
    };

    return (
        <div className="container-post">
            <div className="post-header">
                <h1>Agregar Alumno</h1>
            </div>
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Apellido"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birth">Fecha Nac.</label>
                        <input
                            type="date"
                            id="birth"
                            placeholder="Fecha Nacimiento"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Celular</label>
                        <input
                            type="number"
                            id="phone"
                            placeholder="Celular"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cf">Certificado Físico</label>
                        <input
                            type="checkbox"
                            id="cf"
                            checked={status === 1}
                            onChange={(e) => setStatus(e.target.checked ? 1 : 0)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idtutor">Id Tutor</label>
                        <input
                            type="number"
                            id="idtutor"
                            value={idtutor ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setIdtutor(value === "" ? null : Number(value));}}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Agregar alumno</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
