import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function FeeCalculate() {
    const { idstudent } = useParams<{ idstudent: string }>(); // Obtener el ID del estudiante de la URL
    const [fee, setFee] = useState<number>(1000); // Valor base de la cuota
    const [discount, setDiscount] = useState<number>(0);
    const [finalFee, setFinalFee] = useState<number>(1000);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentRes = await axios.get(`http://localhost:5000/students/${idstudent}`);
                const { idtutor } = studentRes.data;

                if (idtutor) {
                    const siblingsRes = await axios.get(`http://localhost:5000/students?tutor=${idtutor}`);
                    const siblingsCount = siblingsRes.data.length;

                    let discountRate = 0;
                    if (siblingsCount === 2) discountRate = 0.10;
                    if (siblingsCount >= 3) discountRate = 0.15;

                    setDiscount(discountRate);
                    setFinalFee(fee * (1 - discountRate));
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, [idstudent, fee]);

    return (
        <div>
            <h1>Cálculo de Cuota</h1>
            <p>Valor base: ${fee}</p>
            <p>Descuento aplicado: {discount * 100}%</p>
            <p>Valor final a pagar: ${finalFee.toFixed(2)}</p>
        </div>
    );
}
