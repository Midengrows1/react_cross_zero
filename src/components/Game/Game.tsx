import Field from "../Field/Field";
import Information from "../Information/Information";
import { useState } from "react";
export type GameLayoutProps = {
  fields: string[];
  isDraw: boolean;
  isGameEnded: boolean;
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  winPatterns: number[][];
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};
const GameLayout: React.FC<GameLayoutProps> = ({
  fields,
  isDraw,
  isGameEnded,
  currentPlayer,
  setCurrentPlayer,
  setFields,
  winPatterns,
  setIsDraw,
  setIsGameEnded,
}) => {
  return (
    <div className="w-full h-[600px] border-2  my-50 box-border p-5">
      <Information
        isDraw={isDraw}
        isGameEnded={isGameEnded}
        currentPlayer={currentPlayer}
        setIsDraw={setIsDraw}
        setIsGameEnded={setIsGameEnded}
        setCurrentPlayer={setCurrentPlayer}
        setFields={setFields}
      />
      <div className="flex items-center justify-center w-full h-max">
        <Field
          fields={fields}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setFields={setFields}
          winPatterns={winPatterns}
          setIsDraw={setIsDraw}
          setIsGameEnded={setIsGameEnded}
        />
      </div>
    </div>
  );
};
const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [fields, setFields] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Варианты побед по горизонтали
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Варианты побед по вертикали
    [0, 4, 8],
    [2, 4, 6], // Варианты побед по диагонали
  ];
  return (
    <div>
      <GameLayout
        fields={fields}
        currentPlayer={currentPlayer}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
        setIsGameEnded={setIsGameEnded}
        setIsDraw={setIsDraw}
        setCurrentPlayer={setCurrentPlayer}
        setFields={setFields}
        winPatterns={WIN_PATTERNS}
      />
    </div>
  );
};
export default Game;
