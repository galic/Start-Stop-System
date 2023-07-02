import { JSX, ParentComponent, ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./Nav.module.css";
import logo from "../assets/icons8-clock-49.png";

export const Nav: ParentComponent = (props) => {
    return (
        <nav class={styles.navbar}>
            <div class={styles.brand}>
                <A class={styles.item} href="/">
                    <img src={logo} />
                </A>
                <button class={styles.burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            {/* <div class={styles.navbarMenu}>{props.children}</div> */}
        </nav>
    );
};
