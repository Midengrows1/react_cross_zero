type FieldProps = {
  fields: string[];
  showMark: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
};
type FieldLayoutProps = FieldProps & {};

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

const Field: React.FC<FieldProps> = ({ fields, showMark }) => {
  return <FieldLayout fields={fields} showMark={showMark} />;
};
export default Field;
