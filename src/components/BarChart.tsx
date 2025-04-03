import React from 'react';
import { Chart } from "react-google-charts";

// Définir les types pour les props
interface BarChartProps {
  chartData: (string[] | [string, number, number])[]; // Données à afficher dans le graphique
}

const BarChart: React.FC<BarChartProps> = ({ chartData }) => {
  return (
    <div className="App">
      {/* Utilisation de react-google-charts pour afficher le graphique en barres */}
      <Chart chartType="BarChart" width="100%" height="400px" data={chartData} />
    </div>
  );
};

export default BarChart;
