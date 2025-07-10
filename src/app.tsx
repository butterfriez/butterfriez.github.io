import {Suspense, type Component} from "solid-js";
import Background from "./components/Background";
import {useTheme} from "./context/ThemeProvider";
import ThemeSwitcher from "./components/ThemeSwitcher";

function PageLink(props: {name: string, href?: string}) {
    return <a class={"text-subtext3"} href={props.href}>{props.name}</a>
}

const App: Component = (props: { children: Element }) => {
  const [isLightMode] = useTheme();

  return (
    <>

        <main class={`flex flex-col ${isLightMode() ? "mocha" : "latte"} bg-transparent`}>
            <nav
                class={`sticky top-0 z-10 w-full bg-base text-text font-bold px-4 h-8 bg-opacity-10 border-base border-opacity-30 border-b-2 backdrop-filter backdrop-blur-lg`}>
                <ul class="flex items-center justify-between h-full">
                    <ul class="flex items-center h-full">
                        <PageLink name={"Home"} href={"/"}/>
                    </ul>
                    <ThemeSwitcher/>
                </ul>
            </nav>
            <Background/>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div class="pointer-events-auto">
                    <Suspense>{props.children}</Suspense>
                </div>
            </div>
        </main>
    </>
  );
};

export default App;
