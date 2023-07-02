import { Component, createEffect, onMount } from 'solid-js';
import List from './components/List';
import { Header } from './components/Header';

const App: Component = () => {
  //createEffect(() => console.log('effect'))
  onMount(() => console.log('onmount'))
  return (
    <div class="App">
      <Header />
      <List />
    </div>
  );
};

export default App;
