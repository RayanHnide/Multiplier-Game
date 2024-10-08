import { SpeedSliderProps } from "../../types/interfaces";

const SpeedSlider: React.FC<SpeedSliderProps> = ({ onSpeedChange }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <input
        type="range"
        min="1"
        max="5"
        defaultValue="1"
        onChange={(e) => onSpeedChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default SpeedSlider;