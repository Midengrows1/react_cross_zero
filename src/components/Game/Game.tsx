import Field from "../Field/Field";
import Information from "../Information/Information";
import { useState, useEffect } from "react";
export type GameLayoutProps = {
  fields: string[];
  isDraw: boolean;
  isGameEnded: boolean;
  showMark: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
  resetGame: () => void;
  gameStatus: string;
};
const GameLayout: React.FC<GameLayoutProps> = ({
  fields,
  isDraw,
  isGameEnded,
  showMark,
  resetGame,
  gameStatus,
}) => {
  return (
    <div className="w-full h-[600px] border-2  my-50 box-border p-5">
      <Information
        isDraw={isDraw}
        isGameEnded={isGameEnded}
        resetGame={resetGame}
        gameStatus={gameStatus}
      />
      <div className="flex items-center justify-center w-full h-max">
        <Field fields={fields} showMark={showMark} />
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
  const showMark = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.currentTarget.innerText = currentPlayer;
    setFields((prevFields) => {
      prevFields[index] = currentPlayer;
      return [...prevFields];
    });
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
    e.currentTarget.disabled = true;
    e.currentTarget.classList.remove("hover:bg-gray-200");
    e.currentTarget.classList.remove("active:scale-105");
  };
  useEffect(() => {
    if (fields.length > 0) {
      WIN_PATTERNS.forEach((pattern) => {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          setCurrentPlayer(fields[a]);
          setIsGameEnded(true);
        } else if (!fields.includes("")) {
          setIsDraw(true);
        }
      });
    }
  }, [fields]);

  let gameStatus = "";
  if (isDraw) {
    gameStatus = "Ничья!";
  } else if (isGameEnded && !isDraw) {
    gameStatus = `Победа: ${currentPlayer}`;
  } else if (!isDraw && !isGameEnded) {
    gameStatus = `Ходит: ${currentPlayer}`;
  }

  const resetGame = () => {
    setIsDraw(false);
    setIsGameEnded(false);
    setCurrentPlayer("X");
    setFields(["", "", "", "", "", "", "", "", ""]);
  };
  return (
    <div>
      <GameLayout
        fields={fields}
        isGameEnded={isGameEnded}
        isDraw={isDraw}
        showMark={showMark}
        resetGame={resetGame}
        gameStatus={gameStatus}
      />
    </div>
  );
};
export default Game;
