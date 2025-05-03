import { useEffect } from "react";

type FieldProps = {
  fields: string[];
  currentPlayer: string;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  winPatterns: number[][];
  setIsDraw: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
};
type FieldLayoutProps = {
  fields: string[];
  showMark: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
};

const FieldLayout: React.FC<FieldLayoutProps> = ({ fields, showMark }) => {
  return (
    <div className="w-96 h-96 border-2 my-4 box-border bg-white">
      <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full w-full p-2 box-border">
        {fields!.map((item, index) => (
          <button
            disabled={item !== ""}
            key={index}
            className="border-2 hover:bg-gray-200 transition ease-in-out cursor-pointer active:scale-105"
            onClick={(e) => showMark(e, index)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const Field: React.FC<FieldProps> = ({
  fields,
  currentPlayer,
  setCurrentPlayer,
  setFields,
  winPatterns,
  setIsDraw,
  setIsGameEnded,
}) => {
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
      winPatterns.forEach((pattern) => {
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

  return <FieldLayout fields={fields} showMark={showMark} />;
};
export default Field;
