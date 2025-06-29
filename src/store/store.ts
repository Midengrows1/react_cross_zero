import { createStore } from "redux";
export interface AppState {
  counter: number;
  currentPlayer: string;
  fields: string[];
  isGameEnded: boolean;
  isDraw: boolean;
}
const initialState: AppState = {
  counter: 0,
  currentPlayer: "X",
  fields: ["", "", "", "", "", "", "", "", ""],
  isGameEnded: false,
  isDraw: false,
};

export const MAKE_MOVE = "MAKE_MOVE";
export const RESET_GAME = "RESET_GAME";

interface MakeMoveAction {
  type: typeof MAKE_MOVE;
  payload: { index: number };
}
interface ResetGameAction {
  type: typeof RESET_GAME;
}
export type storeActionTypes = MakeMoveAction | ResetGameAction;
const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(fields: string[]): string | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return fields[a];
    }
  }
  return null;
}
function mainReducer(
  state = initialState,
  action: storeActionTypes
): AppState {
  switch (action.type) {
    case MAKE_MOVE: {
      const { index } = action.payload;
      if (state.fields[index] || state.isGameEnded) return state;

      const newFields = [...state.fields];
      newFields[index] = state.currentPlayer;

      const winner = checkWinner(newFields);
      const isDraw = !winner && newFields.every((cell) => cell !== "");

      return {
        ...state,
        fields: newFields,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        isGameEnded: !!winner || isDraw,
        isDraw: isDraw,
      };
    }
    case RESET_GAME:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
export const store = createStore(mainReducer);
