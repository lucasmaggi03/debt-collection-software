import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './FeeCalculate.css'

export function FeeCalculate() {
    const { idstudent } = useParams<{ idstudent: string }>();
    const [feeOnTime, setFeeOnTime] = useState<number>(0);
    const [feeLate, setFeeLate] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [finalFee, setFinalFee] = useState<number>(0);
    const [siblingsCount, setSiblingsCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const studentResponse = await axios.get(`http://localhost:5000/students/${idstudent}`);
                const student = studentResponse.data;

                
                const siblingsResponse = await axios.get(`http://localhost:5000/students/siblings/${student.idtutor}`);
                const siblingsCount = siblingsResponse.data.length - 1;
                setSiblingsCount(siblingsCount < 0 ? 0 : siblingsCount);

                
                const feeResponse = await axios.get("http://localhost:5000/fee-schedule");
                const { fee_on_time, fee_late, onesib, twosib } = feeResponse.data;

                setFeeOnTime(fee_on_time);
                setFeeLate(fee_late);

                
                let discountRate = 0;
                if (siblingsCount === 1) {
                    discountRate = onesib / 100; 
                } else if (siblingsCount >= 2) {
                    discountRate = twosib / 100;
                }
                setDiscount(discountRate);

                const finalAmount = fee_on_time - fee_on_time * discountRate;
                setFinalFee(finalAmount);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [idstudent]);

    return (
        <>
        <div className="container-fee">
            <div className="fee-schedule">
                <h1>Cálculo de Cuota</h1>
                <p>Cuota a tiempo: ${feeOnTime.toFixed(2)}</p>
                <p>Cuota tardía: ${feeLate.toFixed(2)}</p>
                <p>Hermanos: {siblingsCount}</p>
                <p>Descuento aplicado: {discount * 100}%</p>
                <p>Valor final a pagar: ${finalFee.toFixed(2)}</p>
                
                <div className="payment-actions">
                    <label htmlFor="check-pay" className="payment-label">
                        <input type="checkbox" id="check-pay" />
                        <p>Confirmar pago</p>
                    </label>
                </div>
                <button className="btn-payment">Generar pago</button>
            </div>
        </div>
        <div className="container-payment">
            <h1>Listado de pagos históricos</h1>
        </div>
        </>
    );
}
