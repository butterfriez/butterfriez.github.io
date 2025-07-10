export default function PageSection(props) {
    return (
        <div>
            <h1 class={"text-text font-bold text-3xl"}>{props.title}</h1>
            <section
                class={`min-h-1/2 text-subtext1 font-bold min-w-1/2 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded p-3 border-text border ${props.class || ""}`}
                style={props.style}
            >
                {props.children}
            </section>
        </div>
    );
}
