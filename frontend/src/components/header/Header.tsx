import "./Header.css";
import {useState} from "react";

function Header() {
    const [count, setCount] = useState(0)

    return (
        <header>
                <div id={"heading"}>
                    <a title={"Daschboard"} href={""} >
                        <img alt={"Dashboard Icon"} id={"dash-icon-header"} className={"logo"} src="../src/assets/dash-red-192x192.png" />
                    </a>
                    <h1>Sourc(es)</h1>
                </div>
                <div id={"creativity-boost"}>
                    <p>Creativity-boost &copy;lick counter</p>
                    <button onClick={() => setCount((count) => count + 1)}>
                        Level {count}
                    </button>
                </div>
        </header>
    )
}

export default Header