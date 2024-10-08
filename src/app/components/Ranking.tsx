"use client"

import React from 'react';
import { RankingTableProps } from "../../types/interfaces";
 

 

const RankingTable: React.FC<RankingTableProps> = ({ rankings }) => {
  return (
    <table className="w-full border-collapse bg-gray-800 text-white">
      <thead>
        <tr>
          <th className="border-b-2 border-gray-600 p-2">Rank</th>
          <th className="border-b-2 border-gray-600 p-2">Player</th>
          <th className="border-b-2 border-gray-600 p-2">Points</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {rankings.map((player, index) => (
          <tr key={index} className="hover:bg-gray-700">
            <td className="border-b border-gray-600 p-2">{index + 1}</td>
            <td className="border-b border-gray-600 p-2">{player.name}</td>
            <td className="border-b border-gray-600 p-2">{player.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;