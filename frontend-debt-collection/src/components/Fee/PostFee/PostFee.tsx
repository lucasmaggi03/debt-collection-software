import axios from "axios";
import { useState } from "react";
import "./PostFee.css";

export function PostFee() {
    const [datefee, setDatefee] = useState("");
    const [fee_on_time, setFee_on_time] = useState("");
    const [porc, setPorc] = useState("");
    const [onesib, setOneSib] = useState("");
    const [twosib, setTwoSib] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const feeOnTimeNum = parseFloat(fee_on_time) || 0;
        const porcNum = parseFloat(porc) || 0;
        const feeLateNum = feeOnTimeNum * (1 + porcNum / 100);

        try {
            await axios.post("http://localhost:5000/fees/:id", {
                datefee,
                fee_on_time: feeOnTimeNum,
                fee_late: feeLateNum,
                onesib,
                twosib,
            });

            setDatefee("");
            setFee_on_time("");
            setPorc("");
            setOneSib("");
            setTwoSib("");
        } catch (error) {
            console.error("Error al agregar cuota:", error);
        }
    };

    const feeLateCalculated = fee_on_time && porc
        ? (parseFloat(fee_on_time) * (1 + parseFloat(porc) / 100)).toFixed(2)
        : "0";

    return (
        <div className="container-post">
            <div className="post-header">
                <h1>Nueva cuota</h1>
            </div>
            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Fecha creación</label>
                        <input
                            type="text"
                            id="name"
                            disabled
                            placeholder="fecha"
                            value={new Date().toLocaleDateString()}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fee_on_time">Valor a fecha</label>
                        <input
                            type="number"
                            id="fee_on_time"
                            placeholder="Valor"
                            value={fee_on_time}
                            onChange={(e) => setFee_on_time(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Valor atrasado | Ingresar porcentaje </label>
                        <input
                            min={0}
                            max={100}
                            type="number"
                            placeholder="PORCENTAJE"
                            value={porc}
                            onChange={(e) => setPorc(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Valor atrasado"
                            disabled
                            value={feeLateCalculated}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="onesib">Descuento por un hermano</label>
                        <input
                            type="number"
                            id="onesib"
                            placeholder="Valor"
                            value={onesib}
                            onChange={(e) => setOneSib(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="twosib">Descuento por dos hermano</label>
                        <input
                            type="number"
                            id="twosib"
                            placeholder="Valor"
                            value={twosib}
                            onChange={(e) => setTwoSib(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Agregar cuota</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
