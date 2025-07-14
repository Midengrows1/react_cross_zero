import { makeMoveActionCreator } from "../../store/gameReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type FieldProps = {
  fields: string[];
  showMark: (index: number) => void;
};

const FieldLayout: React.FC<FieldProps> = ({ fields, showMark }) => {
  return (
    <div className="w-96 h-96 border-2 my-4 box-border bg-white">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full w-full p-2 box-border">
        {fields!.map((item, index) => (
          <button
            disabled={item !== ""}
            key={index}
            className="border-2 hover:bg-gray-200 transition ease-in-out cursor-pointer active:scale-105"
            onClick={() => showMark(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const Field: React.FC = () => {
  const fields = useAppSelector(state => state.fields);
  const dispatch = useAppDispatch();
  const isGameEnded = useAppSelector(state => state.isGameEnded);
  const showMark = (index: number) => {
    if (fields[index] || isGameEnded) return;
    dispatch(makeMoveActionCreator(index));
  };
  return <FieldLayout fields={fields} showMark={showMark} />;
};
export default Field;
