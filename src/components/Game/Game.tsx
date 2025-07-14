import Field from "../Field/Field";
import Information from "../Information/Information";
const GameLayout: React.FC = () => {
  return (
    <div className="w-full h-[600px] border-2  my-50 box-border p-5">
      <Information />
      <div className="flex items-center justify-center w-full h-max">
        <Field />
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <GameLayout />
  );
};
export default Game;
