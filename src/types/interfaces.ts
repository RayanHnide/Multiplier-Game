export interface Ranking {
  name: string;
  points: number;
}

export interface UserRoundData {
  name: string;
  points: number;
  multiplier: number;
}


export interface GameBoardProps {
  multiplier: number;
  speed: number;
  points: number;
  prediction: number;
}


export interface PlayerInputsProps {
  onSubmit: (points: number, prediction: number) => void;
}


export interface SpeedSliderProps {
  onSpeedChange: (speed: number) => void;
};




export interface RankingTableProps {
  rankings: Ranking[];
}

export interface RoundData {
  name: string;
  points: number;
  multiplier: number;
}