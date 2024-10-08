'use client'
import GameBoard from "./components/GameBoard";
import PlayerInputs from "./components/PlayerInputs";
import SpeedSlider from "./components/SpeedSlider";
import RankingTable from "./components/Ranking";
import Chat from "./components/Chat";
import useMultiplier from "../hooks/useMultiplier";
import { useState, useEffect, useCallback } from "react";
import { Chart } from "chart.js/auto";
import { CategoryScale } from 'chart.js';
import SignIn from "./components/SignIn";
import Loading from "./components/loading";
import UserInfoCard from "./components/UserInfoCard";
import CurrentRoundTable from "./components/CurrentRound";
import { Ranking, UserRoundData } from "../types/interfaces";
Chart.register(CategoryScale);

function App() {
  const multiplier = useMultiplier();
   const [rankings, setRankings] = useState<Ranking[]>([
    { name: "CPU 1", points: 0 },
    { name: "CPU 2", points: 0 },
    { name: "CPU 3", points: 0 },
    { name: "CPU 4", points: 0 },
  ]);

  const [speed, setSpeed] = useState(1);
  const [points, setPoints] = useState(0);
  const [prediction, setPrediction] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRoundData, setUserRoundData] = useState<UserRoundData[]>([
    { name: "You", points: 0, multiplier: 0 },
    { name: "CPU 1", points: 0, multiplier: 0 },
    { name: "CPU 2", points: 0, multiplier: 0 },
    { name: "CPU 3", points: 0, multiplier: 0 },
    { name: "CPU 4", points: 0, multiplier: 0 },
  ]);

  useEffect(() => {
    setRankings((prevRankings: Ranking[]) =>
      prevRankings.map((ranking: Ranking) => ({
        ...ranking,
        points: 0,
      }))
    );
  }, []);

  const handleSignIn = useCallback((name: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setPlayerName(name);
      setIsSignedIn(true);
      setPoints(100);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePlayerSubmit = useCallback((submittedPoints: number, prediction: number) => {
    setPrediction(prediction);

    if (typeof submittedPoints !== 'number' || typeof prediction !== 'number' || submittedPoints <= 0 || prediction <= 0) {
      alert("Please enter a valid number of points and prediction greater than zero.");
      return;
    }

    const currentMultiplier = multiplier;
    let earnedPoints = 0;
    
    if (prediction >= currentMultiplier) {
      earnedPoints = submittedPoints * currentMultiplier;
      alert(`Congratulations! You earned ${earnedPoints} points!`);
    } else {
      earnedPoints = -submittedPoints;
      alert(`Sorry, you lost ${submittedPoints} points.`);
    }

    setPoints((prevPoints) => prevPoints + earnedPoints);

    setUserRoundData((prevData) => prevData.map((data) => 
      data.name === "You" 
        ? { ...data, points: points + earnedPoints, multiplier: currentMultiplier }
        : { ...data, points: Math.floor(Math.random() * 100), multiplier: Math.random() }
    ));

    setRankings((prevRankings) => [
      ...prevRankings.map((ranking) => ({
        ...ranking,
        points: Math.floor(Math.random() * 100)
      })),
      { name: playerName, points: earnedPoints }
    ]);
  }, [multiplier, playerName, points]);

  return (
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <>
        <h1 className="text-3xl font-bold mb-4 text-center">Multiplier Game</h1>
       
        <div className="grid grid-cols-1 md:grid-cols-3  md:gap-20">
          <div className="col-span-1 grid grid-rows-2 gap-8 ">
            {isLoading ? (
              <Loading /> 
            ) : isSignedIn ? (
              <>
                <PlayerInputs onSubmit={handlePlayerSubmit} />
                <CurrentRoundTable data={userRoundData} />
              </>
            ) : (
              <SignIn setName={handleSignIn} />
            )}
            <div>
              <RankingTable rankings={rankings} />
              <SpeedSlider onSpeedChange={setSpeed} />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 grid gap-4">
            <UserInfoCard name={playerName} points={points} time={isSignedIn ? new Date().toLocaleTimeString() : ''} />
            <GameBoard multiplier={multiplier} speed={speed} points={0} prediction={prediction} />
            <Chat />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;