import { Component, createSignal, onMount } from "solid-js";

export const CheckPoint: Component<{ checkNum: number }> = (props) => {
  const [num, setNum] = createSignal("");

  onMount(async ()=>{
    //get last checked number
    const result = await (await fetch('https://my-json-server.typicode.com/galic/db/checkpoints')).json()
  })

  return (
    <div class="App">
      <h1>Checkpoint {props.checkNum}</h1>
      <div>last runner checked</div>
      <div>
        <input
          type="number"
          value={num()}
          oninput={(e) => setNum(e.target.value)}
        />
        <button onclick={() => console.log(num())}>Start</button>
      </div>
    </div>
  );
};
