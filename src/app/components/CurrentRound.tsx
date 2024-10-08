 
import { RoundData } from "../../types/interfaces";
  
  function CurrentRoundTable({ data }: { data: RoundData[] }) {
    return (
      <table className="min-w-full bg-gray-800 text-white p-4">
        <thead className="text-center">
          <tr className="text-center">
            <th className="py-2">Name</th>
            <th className="py-2">Point</th>
            <th className="py-2">Multiplier</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, index) => (
            <tr key={index} className={item.name === "You" ? "bg-gray-700" : ""}>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.points}</td>
              <td className="py-2">{item.multiplier.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default CurrentRoundTable;