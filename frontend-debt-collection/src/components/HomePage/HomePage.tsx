import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js';
import axios from 'axios';
import './HomePage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler
);

export function HomePage() {
  const [studentData, setStudentData] = useState<number[]>(new Array(12).fill(0));
  const [certificatesData, setCertificatesData] = useState<number[]>([0, 0]);
  const [revenueData, setRevenueData] = useState<number[]>(new Array(12).fill(0));

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const studentResponse = await axios.get('http://localhost:5000/students');
        const studentCounts = new Array(12).fill(0);
        studentResponse.data.forEach((student: any) => {
          const month = new Date(student.created_at).getMonth();
          studentCounts[month] += 1;
        });
        setStudentData(studentCounts);

        const certified = studentResponse.data.filter((s: any) => s.status === 1).length;
        const notCertified = studentResponse.data.length - certified;
        setCertificatesData([certified, notCertified]);

        const paymentResponse = await axios.get('http://localhost:5000/payments');
        const revenueCounts = new Array(12).fill(0);
        paymentResponse.data.forEach((payment: any) => {
          const month = new Date(payment.created_at).getMonth();
          revenueCounts[month] += parseFloat(payment.final_fee);
        });
        setRevenueData(revenueCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const barData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Cant. Alumnos',
        data: studentData,
        backgroundColor: '#bb86fc',
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ['Certificados Entregados', 'No Entregados'],
    datasets: [
      {
        label: 'Distribución de Certificados',
        data: certificatesData,
        backgroundColor: ['#bb86fc', '#ff4081'],
        borderRadius: 5,
      },
    ],
  };

  const areaData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Monto Recaudado',
        data: revenueData,
        fill: true,
        backgroundColor: 'rgba(187, 134, 252, 0.4)',
        borderColor: '#bb86fc',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const pieOption = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Onest Variable', system-ui, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Evolución del Monto Recaudado por Mes',
        color: '#fff',
        font: {
          size: 20,
          family: "'Onest Variable', system-ui, sans-serif",
          },
        },
    },
  };
  
  const areaOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Onest Variable', system-ui, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Evolución del Monto Recaudado por Mes',
        color: '#fff',
        font: {
          size: 20,
          family: "'Onest Variable', system-ui, sans-serif",
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Onest Variable', system-ui, sans-serif",
          },
        },
      },
      y: {
        ticks: {
          color: '#fff',
          font: {
            size: 14,
            family: "'Onest Variable', system-ui, sans-serif",
          },
        },
      },
    },
  };

  return (
    <div className="container">
      <div className="chart-container">
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Alumnos ingresantes por mes' }}}, areaOptions} />
      </div>
      <div className="chart-container">
        <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Certificados Físicos Entregados' }}}, pieOption} />
      </div>
      <div className="chart-container">
        <Line data={areaData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Evolución del Monto Recaudado por Mes' }}}, areaOptions} />
      </div>
    </div>
  );
}
