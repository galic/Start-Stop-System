import { Component } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./Header.module.css";
import logo from "../assets/icons8-clock-49.png";

const Menu: Component = () => {
  return (
    <div class="menu">
      {/* <A class={styles.menuItem} href="/" activeClass={styles.Current}>
        List
      </A> */}
      <A class={styles.menuItem} href="/start" activeClass={styles.Current}>
        Start
      </A>
      <A class={styles.menuItem} href="/stop" activeClass={styles.Current}>
        Stop
      </A>
    </div>
  );
};

export const Header: Component = () => {
  return (
    <header class={styles.header}>
      <div class={styles.wrapper}>
        <A href="/">
          <img src={logo} />
        </A>
        <Menu />
      </div>
    </header>
  );
};
