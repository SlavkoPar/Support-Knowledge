import { createContext, useReducer } from "react";

export interface IThemeState {
  darkMode: boolean,
  variant?: string,
  bg: string
}

enum ThemeActionKind {
  LIGHTMODE = 'LIGHTMODE',
  DARKMODE = 'DARKMODE',
}

// An interface for our actions
interface IThemeAction {
  type: ThemeActionKind;
}

const initialState = {
  darkMode: false,
  variant: 'light',
  bg: 'light'
};

export const ThemeContext = createContext<{ state: IThemeState; dispatch: React.Dispatch<any> }>({
  state: initialState,
  dispatch: () => null
});


const themeReducer = (state: IThemeState, action: IThemeAction) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { ...state, darkMode: false, variant: 'light', bg: 'light' };
    case "DARKMODE":
      return { ...state, darkMode: true, variant: 'dark', bg: 'dark' };
    default:
      return state;
  }
};

export function ThemeProvider(props: { children: React.ReactNode })
{
  const [state, dispatch] = useReducer(themeReducer, initialState);
  return <ThemeContext.Provider value={{ state, dispatch }}>
    {props.children}
  </ThemeContext.Provider>;
}