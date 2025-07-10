import {createContext, createSignal, JSX, Setter, Accessor, useContext, createEffect} from "solid-js";

type ThemeContextType = [Accessor<boolean>, Setter<boolean>];

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: JSX.Element;
};

export function ThemeProvider(props: ThemeProviderProps) {
    const storage = window.localStorage;

    const [isLightMode, setIsLightMode] = createSignal(Boolean(storage.getItem("theme")) || false);

    createEffect(() => {
        storage.setItem("theme", String(isLightMode()))
    })

    const theme: ThemeContextType = [isLightMode, setIsLightMode];

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}
