import { Component } from 'solid-js';
import { Header } from './components/Heaader';
import { CheckPoint } from './components/CheckPoint';

export const Stop: Component = () => {
  return (
    <>
      <Header />
      <CheckPoint checkNum={1} title='Стоп' />
    </>
  )
};

export default Stop