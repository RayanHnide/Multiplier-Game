import { useState } from "react";
import { PlayerInputsProps } from "../../types/interfaces";

const PlayerInputs = ({ onSubmit }: PlayerInputsProps) => {
  const [points, setPoints] = useState(0);
  const [prediction, setPrediction] = useState(0);

  const handleSubmit = () => {
    onSubmit(points, prediction);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg grid  gap-4 shadow-md">
     <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
        className="w-full form-input p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />
      <input
        type="number"
        placeholder="Multiplier Prediction"
        value={prediction}
        onChange={(e) => setPrediction(Number(e.target.value))}
        className="w-full form-input p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
  className="w-full p-2 text-white rounded bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90"
>
  Start
</button>
    </div>
  );
};

export default PlayerInputs;