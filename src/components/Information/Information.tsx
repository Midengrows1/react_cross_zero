type InformationProps = {
  isDraw: boolean;
  isGameEnded: boolean;
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};
type InformationLayoutProps = InformationProps & {
  gameStatus: string;
};
const InformationLayout: React.FC<InformationLayoutProps> = ({
  gameStatus,
  isGameEnded,
  isDraw,
  currentPlayer,
  setIsDraw,
  setIsGameEnded,
  setCurrentPlayer,
  setFields,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Information: {gameStatus}</h1>
      {isGameEnded && !isDraw ? (
        <p className="text-green-600">Winner: {currentPlayer}</p>
      ) : null}
      {isGameEnded || isDraw ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setIsDraw(false);
            setIsGameEnded(false);
            setCurrentPlayer("X");
            setFields(["", "", "", "", "", "", "", "", ""]);
          }}
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
  currentPlayer,
  setIsDraw,
  setIsGameEnded,
  setCurrentPlayer,
  setFields,
}) => {
  let gameStatus = "";
  if (isDraw) {
    gameStatus = "Ничья!";
  } else if (isGameEnded && !isDraw) {
    gameStatus = `Победа: ${currentPlayer}`;
  } else if (!isDraw && !isGameEnded) {
    gameStatus = `Ходит: ${currentPlayer}`;
  }
  return (
    <InformationLayout
      isDraw={isDraw}
      isGameEnded={isGameEnded}
      currentPlayer={currentPlayer}
      gameStatus={gameStatus}
      setIsDraw={setIsDraw}
      setIsGameEnded={setIsGameEnded}
      setCurrentPlayer={setCurrentPlayer}
      setFields={setFields}
    />
  );
};

export default Information;
