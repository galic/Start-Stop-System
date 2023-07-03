import { Component, children } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./Header.module.css";
import logo from "../assets/icons8-clock-49.png";
import { Nav } from "./Nav";

const Menu: Component = () => {
    return (
        <div class="menu">
            {/* <A class={styles.menuItem} href="/" activeClass={styles.Current}>
        List
      </A> */}
            <A
                class={styles.menuItem}
                href="/start"
                activeClass={styles.Current}
            >
                Старт
            </A>
            <A
                class={styles.menuItem}
                href="/stop"
                activeClass={styles.Current}
            >
                Финиш
            </A>
            <A
                class={styles.menuItem}
                href="/groups"
                activeClass={styles.Current}
            >
                Группы
            </A>
            <A
                class={styles.menuItem}
                href="/athletes"
                activeClass={styles.Current}
            >
                Спортсмены
            </A>
            <A
                class={styles.menuItem}
                href="/massstart"
                activeClass={styles.Current}
            >
                Массстарт
            </A>
        </div>
    );
};

export const Header: Component = () => {
    return (
        <header class={styles.header}>
            <nav class={styles.wrapper}>
                <A href="/">
                    <img src={logo} />
                </A>
                <Menu />
            </nav>
            <Nav>
                <div class="start">
                    <A class="item" href="/start">Старт</A>
                    <A class="item" href="/stop">Финиш</A>
                </div>
                <div class="end">
                    <A class="item" href="/start">Группы</A>
                    <A class="item" href="/stop">Участники</A>
                    <A class="item" href="/massstart">Массстарт</A>
                </div>
            </Nav>
        </header>
    );
};
