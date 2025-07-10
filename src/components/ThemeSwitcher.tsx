import {useTheme} from "../context/ThemeProvider";
import {Show} from "solid-js";
import {FaSolidMoon, FaSolidSun} from "solid-icons/fa";

export default function ThemeSwitcher(props) {
    const [isLightTheme, setIsLightTheme] = useTheme();

    return <Show when={isLightTheme()} fallback={<FaSolidMoon onClick={() => setIsLightTheme(true)}/>}>
        <FaSolidSun onClick={() => setIsLightTheme(false)}/>
    </Show>
}