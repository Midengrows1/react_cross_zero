import Field from "../Field/Field";
import Information from "../Information/Information";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { makeMoveActionCreator, resetGameActionCreator } from "../../store/gameReducer";
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
  const fields = useAppSelector(state => state.fields);
  const isDraw = useAppSelector(state => state.isDraw);
  const isGameEnded = useAppSelector(state => state.isGameEnded);
  const currentPlayer = useAppSelector(state => state.currentPlayer);
  const dispatch = useAppDispatch();

  const showMark = (index: number) => {
    if (fields[index] || isGameEnded) return;
    dispatch(makeMoveActionCreator(index));
  };
  const resetGame = () => {
    dispatch(resetGameActionCreator());
  };
  let gameStatus = "";
  if (isDraw) {
    gameStatus = "Ничья!";
  } else if (isGameEnded && !isDraw) {
    gameStatus = `Победа: ${currentPlayer === "X" ? "O" : "X"}`;
  } else {
    gameStatus = `Ходит: ${currentPlayer}`;
  }
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
