import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { GameBoardProps } from "../../types/interfaces";
const GameBoard: React.FC<GameBoardProps> = ({ multiplier, speed, points, prediction }) => {
  const [data, setData] = useState({
    labels: Array.from({ length: 10 }, (_, i) => i.toString()),
    datasets: [{
      label: "Multiplier",
      data: Array(10).fill(0),
      borderColor: "red",
      fill: false,
      pointRadius: 8,
      pointBackgroundColor: "yellow",
      tension: 0.4,
    }]
  });

  const options = {
    scales: {
      x: { beginAtZero: true },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: string | number) {
            return `${tickValue}`;
          }
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.datasets[0].data];
        newData[index] = (points + prediction * Math.pow(multiplier, index) * speed).toFixed(2);
        return {
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: newData
          }]
        };
      });
      index++;
      if (index >= 10) clearInterval(interval);
    }, 500); // تحديث كل 500 مللي ثانية

    return () => clearInterval(interval);
  }, [multiplier, speed, points, prediction]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default GameBoard;