import PageSection from "../components/PageSection";
import {SiGithub, SiTypescript} from "solid-icons/si";
import {createSignal, onMount} from "solid-js";
import AvatarViewer from "../components/AvatarViewer";

interface RobloxUserDataResponse {
    created: string;
    description: string;
    displayName: string;
    externalAppDisplayName: string | null;
    hasVerifiedBadge: boolean;
    id: number;
    isBanned: boolean;
    name: string;
}

function InlineListItem(props) {
    return <span class={"inline-flex items-center gap-1"}>
        {props.children}
    </span>
}

function Splitter() {
    return <span class={"h-10 w-0.5 bg-text"}/>
}

export default function Home() {
    const [robloxUser, setRobloxUser] = createSignal("Loading...")

    onMount(() => {
        fetch("https://users.roblox.com/v1/users/" + 560599252).then((res) => res.json()).then((data: RobloxUserDataResponse) => {
            setRobloxUser(data.name)
            console.log(data)
        }).catch((err) => {
            setRobloxUser("buutterfIIes")
            console.log(err)
        })
    })

  return (
      <PageSection title="Home - Butterflies">
          <section class="text-center py-5 flex items-center justify-center gap-10">
              <AvatarViewer class={"w-10 h-10 absolute"}/>
              <div>
                  <h1 class="text-xl font-bold text-text">Welcome to my portfolio.</h1>
                  <a href="/projects"
                     class="mt-1 inline-block bg-accent text px-4 py-2 rounded-xl hover:opacity-90 transition">
                      View Projects
                  </a>
              </div>
          </section>

          <div class={"flex flex-row gap-2"}>
              <section>
                  <h1>About me:</h1>
                  <ul class={"list-disc list-inside"}>
                      <li>Age: 16</li>
                      <li>Location: California</li>
                      <li>Developing Experience: 4 years</li>
                      <li>Skills:
                          <ul class={"list-decimal list-outside ml-10"}>
                              <li><InlineListItem>Luau<img class={"w-6 mt-1"} src={"public/luau.png"}/></InlineListItem></li>
                              <li><InlineListItem>TypeScript<SiTypescript class={"text-blue-600"}/></InlineListItem></li>
                              <li><InlineListItem>Rojo<img class={"w-10"} src={"public/rojo.png"}/></InlineListItem></li>
                              <li><InlineListItem>Github<SiGithub/></InlineListItem></li>
                          </ul>
                      </li>
                      <li>Languages: Spanish & English</li>
                  </ul>
              </section>
              <Splitter/>
              <section>
                  <h1>Contacts:</h1>
                  <ul class={"list-disc list-inside"}>
                      <li>Github: <a class={"underline"} href={"https://github.com/butterfriez"}>butterfriez</a> </li>
                      <li>Discord: butter1796 </li>
                      <li>Roblox: {robloxUser()}</li>
                  </ul>
              </section>
          </div>
      </PageSection>
);
}
