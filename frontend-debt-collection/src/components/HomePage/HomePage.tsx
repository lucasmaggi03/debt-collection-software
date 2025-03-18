import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, Filler } from 'chart.js';
import './HomePage.css';

// Registra todos los elementos necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement, // Para el gráfico de línea (área)
  PointElement, // Necesario para el gráfico de puntos (como las líneas)
  Filler // Necesario para el área rellena
);

export function HomePage() {

  const barData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
        {
            label: 'Cant. Alumnos',
            data: [10, 20, 14, 35, 12, 3, 20, 10, 15, 25, 30, 40],
            backgroundColor: "#bb86fc",
            borderRadius: 5,
        },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Alumnos ingresantes por mes',
        color: '#fff',
        font: {
            size: 20,
            family: "'Onest Variable', system-ui, sans-serif",
        }
      },
    },
    scales:{
        x:{
            ticks:{
                color: '#fff',
                font: {
                    size: 14,
                    family: "'Onest Variable', system-ui, sans-serif",
                },
            },
        },
        y:{
            ticks:{
                color: '#fff',
                font: {
                    size: 14,
                    family: "'Onest Variable', system-ui, sans-serif",
                },
            },
        },
    }
  };

  const pieData = {
    labels: ['Pagadas', 'Pendientes', 'Vencidas'],
    datasets: [
        {
            label: 'Distribución de Cuotas',
            data: [40, 30, 20], 
            backgroundColor: ['#bb86fc', '#03dac6', '#ff4081'], 
            borderRadius: 5,
        },
    ],
  };

  const pieOptions = {
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
        text: 'Distribución de Cuotas por Estado',
        color: '#fff',
        font: {
          size: 20,
          family: "'Onest Variable', system-ui, sans-serif",
        }
      },
    },
    animation: {
      animateRotate: true,
    }
  };

  const areaData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
        {
            label: 'Monto Recaudado',
            data: [500, 1000, 1200, 1500, 800, 600, 1300, 950, 1100, 2000, 2500, 3000], 
            fill: true, 
            backgroundColor: 'rgba(187, 134, 252, 0.4)',
            borderColor: '#bb86fc', 
            borderWidth: 2,
            tension: 0.4, 
        },
    ],
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
        <Bar data={barData} options={barOptions} />
      </div>
      <div className="chart-container">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="chart-container">
        <Line data={areaData} options={areaOptions} />
      </div>
    </div>
  );
}
