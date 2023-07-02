import { Component } from "solid-js";
import { Header } from "./components/Header";
import { CheckPoint } from "./components/CheckPoint";


const Start: Component = () => {
  return (
    <>
      <Header />
      <CheckPoint checkNum={0} title="Старт" />
    </>
  );
};

export default Start;
