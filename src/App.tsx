import { Component, createEffect, onMount } from 'solid-js';
import List from './components/List';
import { Header } from './components/Heaader';
import styles from './App.module.css';

const App: Component = () => {
  //createEffect(() => console.log('effect'))
  onMount(() => console.log('onmount'))
  return (
    <div class={styles.App}>
      <Header />
      <List />
    </div>
  );
};

export default App;
