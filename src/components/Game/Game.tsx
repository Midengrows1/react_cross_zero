import Field from "../Field/Field";
import Information from "../Information/Information";
import { useState, useEffect } from "react";
import { store } from "../../store/store";
export type GameLayoutProps = {
  fields: string[];
  isDraw: boolean;
  isGameEnded: boolean;
  showMark: (index: number) => void;
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
  const [_, setRerender] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setRerender((v) => v + 1);
    });
    return unsubscribe;
  }, []);
  const state = store.getState();
  const showMark = (index: number) => {
    if (state.fields[index] || state.isGameEnded) return;
    store.dispatch({ type: "MAKE_MOVE", payload: { index } });
  };
  const resetGame = () => {
    store.dispatch({ type: "RESET_GAME" });
  };
  let gameStatus = "";
  if (state.isDraw) {
    gameStatus = "Ничья!";
  } else if (state.isGameEnded && !state.isDraw) {
    gameStatus = `Победа: ${state.currentPlayer === "X" ? "O" : "X"}`;
  } else {
    gameStatus = `Ходит: ${state.currentPlayer}`;
  }
  return (
    <div>
      <GameLayout
        fields={state.fields}
        isGameEnded={state.isGameEnded}
        isDraw={state.isDraw}
        showMark={showMark}
        resetGame={resetGame}
        gameStatus={gameStatus}
      />
    </div>
  );
};
export default Game;
