import { useState } from "react"
import NavItem from "./nav-item";
import NavSelector from "./nav-selector";

export default function NavBar() {
    const [active, setActive] = useState(false);
    const [selection, setSelection] = useState({});

    return (
        <div>
            <div className="flex flex-col items-center" onClick={() => { setActive(!active) }}>
                <ul className={`${!active ? "hidden" : "flex"} flex-col-reverse absolute bottom-20 gap-2`}>
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/medication">Medications</NavItem>
                    <NavItem href="/mood">Mood</NavItem>
                    <NavItem href="/todo">Todo</NavItem>
                </ul>
                <NavSelector selected={selection} setSelector={setSelection} />
            </div>
        </div>
    )
}