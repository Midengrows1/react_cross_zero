import { resetGameActionCreator } from "../../store/gameReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
type InformationLayoutProps = {
  isDraw: boolean;
  isGameEnded: boolean;
  resetGame: () => void;
  gameStatus: string;
};
const InformationLayout: React.FC<InformationLayoutProps> = ({
  resetGame,
  isDraw,
  isGameEnded,
  gameStatus,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Information: {gameStatus}</h1>
      {isGameEnded || isDraw ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={resetGame}
        >
          Начать заново
        </button>
      ) : null}
    </div>
  );
};

const Information: React.FC = () => {
  const isDraw = useAppSelector(state => state.isDraw);
  const isGameEnded = useAppSelector(state => state.isGameEnded);
  const currentPlayer = useAppSelector(state => state.currentPlayer);
  const dispatch = useAppDispatch();
  let gameStatus = "";
  if (isDraw) {
    gameStatus = "Ничья!";
  } else if (isGameEnded && !isDraw) {
    gameStatus = `Победа: ${currentPlayer === "X" ? "O" : "X"}`;
  } else {
    gameStatus = `Ходит: ${currentPlayer}`;
  }
  const resetGame = () => {
    dispatch(resetGameActionCreator());
  };
  return (
    <InformationLayout
      isDraw={isDraw}
      isGameEnded={isGameEnded}
      gameStatus={gameStatus}
      resetGame={resetGame}
    />
  );
};

export default Information;
