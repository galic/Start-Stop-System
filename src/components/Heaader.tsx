import { Component } from 'solid-js';
import { A } from "@solidjs/router";
import styles from './Header.module.css';

export const Header: Component = () => {
    return (
        <header class={styles.header}>
            <A href="/" activeClass={styles.Current}>Start Stop app</A>
            <A href="/start" activeClass={styles.Current}>Start</A>
            <A href="/stop" activeClass={styles.Current}>Stop</A>
        </header>
    )
}
