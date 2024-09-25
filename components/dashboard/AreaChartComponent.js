// AreaChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    Tooltip,
    Legend,
    elements,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    Tooltip,
    Legend
);

const AreaChartComponent = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My Area Chart',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
            {
                label: 'My Area Chart 1',
                data: [10, 11, 12, 281, 34, 34, 30],
                fill: true,
                backgroundColor: 'rgba(9, 192, 3, 0.2)',
                borderColor: 'rgba(12, 192, 45, 1)',
                borderWidth: 2,
            },
        ],
    };


    const options = {
        elements: { line: { tension: .3 } },
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Disable x-axis grid
                },
            },
            y: {
                grid: {
                    display: false, // Disable y-axis grid
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default AreaChartComponent;
