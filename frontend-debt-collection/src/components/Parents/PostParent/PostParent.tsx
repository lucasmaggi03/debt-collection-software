import axios from "axios";
import { useState } from "react";
import "./PostParent.css";

export function PostParent() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [celnumb, setCelnumb] = useState("");
    const [dni, setDni] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:5000/tutors/:id", {
                name,
                lastname,
                address,
                email,
                celnumb,
                dni,
            });
            setName("");
            setLastname("");
            setAddress("");
            setEmail("");
            setCelnumb("");
            setDni("");
        } catch (error) {
            console.error("Error al agregar padre:", error);
        }
    };

    return (
        <div className="container-post">
            <div className="post-header">
                <h1>Agregar tutor</h1>
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="celnumb">Teléfono</label>
                        <input
                            type="tel"
                            id="celnumb"
                            placeholder="Teléfono"
                            value={celnumb}
                            onChange={(e) => setCelnumb(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI</label>
                        <input
                            type="number"
                            id="dni"
                            placeholder="DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Agregar padre</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
