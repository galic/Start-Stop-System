import { Component } from "solid-js";
import { Header } from "./components/Heaader";
import { CheckPoint } from "./components/CheckPoint";

const Start: Component = () => {
  return (
    <>
      <Header />
      <CheckPoint checkNum={0} />
    </>
  );
};

export default Start;
