type InformationProps = {
  isDraw: boolean;
  isGameEnded: boolean;
  resetGame: () => void;
  gameStatus: string;
};
type InformationLayoutProps = InformationProps & {
  gameStatus: string;
};
const InformationLayout: React.FC<InformationLayoutProps> = ({
  gameStatus,
  isGameEnded,
  isDraw,
  resetGame,
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

const Information: React.FC<InformationProps> = ({
  isDraw,
  isGameEnded,
  resetGame,
  gameStatus,
}) => {
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
