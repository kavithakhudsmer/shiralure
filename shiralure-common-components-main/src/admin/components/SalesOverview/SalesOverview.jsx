import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './SalesOverview.scss';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverview = ({ monthlyData }) => {
  const defaultData = {
    income: [10.0, 3.8, 3.9, 6.3, 4.0, 6.3, 9.5, 7.8, 8.5, 9.8, 9.2, 9.65],
    expenses: [8.0, 89.2, 7.8, 3.9, 8, 3.8, 5.1, 3.0, 6.1, 6.5, 4.5, 6.65]
  };

  const data = monthlyData || defaultData;

  // Calculate totals
  const totalIncome = data.income.reduce((sum, value) => sum + value, 0).toFixed(2);
  const totalExpenses = data.expenses.reduce((sum, value) => sum + value, 0).toFixed(2);

  // Calculate dynamic y-axis scale
  const maxValue = Math.max(...data.income, ...data.expenses);
  const yStep = Math.ceil(maxValue / 5); // Divide into ~5 steps
  const yMax = Math.ceil(maxValue / yStep) * yStep + yStep; // Round up to next step

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        data: data.income,
        backgroundColor: '#5A66F1',
        borderColor: 'rgb(90, 102, 242)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: '',
        data: data.expenses,
        backgroundColor: 'rgba(169, 169, 169, 0.7)',
        borderColor: 'rgba(169, 169, 169, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.datasetIndex === 0 ? 'Income' : 'Expenses'}: ${context.raw}K`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: {
          stepSize: yStep,
          callback: function(value) {
            return value; // Show all calculated ticks
          }
        },
        grid: {
          display: true,
          drawTicks: false,
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="muthu-sales-overview">
      <div className="muthu-header">
        <h3>Sales Overview</h3>
        <div className="muthu-icon-container">
          <ViewHeadlineOutlinedIcon className="muthu-icon" />
        </div>
      </div>
      
      <div className="muthu-summary-cards">
        <div className="muthu-summary-card">
          <div className="muthu-indicator muthu-income"></div>
          <div className="muthu-content">
            <div className="muthu-amount-row">
              <p>${totalIncome}K</p>
              <h3> / Income</h3>
            </div>
          </div>
        </div>
        
        <div className="muthu-summary-card">
          <div className="muthu-indicator muthu-expenses"></div>
          <div className="muthu-content">
            <div className="muthu-amount-row">
              <p>${totalExpenses}K</p>
              <h3> / Expenses</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="muthu-chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesOverview;