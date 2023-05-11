import { Accessor, Component, createEffect, createSignal, onMount } from "solid-js";
import styles from './CheckPoint.module.css'
import { timestampToTime } from "../common/timeutils";

type CheckPoint = {
  id: number,
  checkpoint: number,
  time: number
}

const LastCheckInfo: Component<{ check: Accessor<CheckPoint | null> }> = (props) => {

  //console.log('LastCheckInfo', props.check())
  //if (props.check() === null) return null

  return (
    <div class={styles.LastCheck}>
      <div>{(props.check() === null)?'not last checked info':'last checked'}</div>
      <div>{props.check()?.id}</div>
      <div>{timestampToTime(props.check()?.time)}</div>
    </div>
  )
}

export const CheckPoint: Component<{ checkNum: number }> = (props) => {
  const [num, setNum] = createSignal("");
  const [lastCheck, setLastCheck] = createSignal<CheckPoint | null>(null)
  onMount(async () => {
    //get last checked number
    const result = await (await fetch('https://my-json-server.typicode.com/galic/db/checkpoints')).json()
  })

  const handler = async () => {

    if (Number(num()) === 0) return;  //empty num() not valid

    const data: CheckPoint = {
      id: Number(num()),
      checkpoint: props.checkNum,
      time: Date.now()
    }

    console.log(data)

    const response = await fetch('https://my-json-server.typicode.com/galic/db/checkpoints', {
      method: 'post',
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(result)
    setNum('')  //clear input
    setLastCheck(data)
  }

  createEffect(() => {
    console.log('createEffect', lastCheck())
  })

  return (
    <div class="App">
      <h1>Checkpoint {props.checkNum}</h1>
      <LastCheckInfo check={lastCheck} />
      <div class={styles.FormWrapper}>
        <input
          class={styles.Input}
          type="number"
          value={num()}
          oninput={(e) => setNum(e.target.value)}
        />
        <button class={styles.Button} onclick={() => handler()}>Start</button>
      </div>
    </div>
  );
};
