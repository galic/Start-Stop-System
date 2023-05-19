import { Accessor, Component, For, createEffect, createSignal, onMount } from "solid-js";
import styles from './CheckPoint.module.css'
import { formatTime } from "../common/timeutils";
import { Checkpoint, addCheck, getLastCheckpoints } from "../common/api";

const LastCheckInfo: Component<{ check: Accessor<Checkpoint[]> }> = (props) => {

  //const chk: Checkpoint | null = props.check()

  return (
    <div class={styles.LastCheck}>
      <h6>{(props.check().length === 0) ? 'not last checked info' : 'last checked'}</h6>
      <For each={props.check()}>{(checkpoint, index) =>
        <div>
          <span>{checkpoint.startingNumber}</span>
          {' '}
          <span>{formatTime(checkpoint.time.getTime())}</span>
          {' '}
          <button data-sn={checkpoint.id}>remove</button>
        </div>
      }
      </For>

    </div>
  )
}

const ShowError: Component<{ err: string }> = props => {
  return (
    <p class="error-box">{props.err}</p>
  )
}

export const CheckPoint: Component<{ checkNum: number }> = (props) => {
  const [num, setNum] = createSignal("");
  const [lastCheck, setLastCheck] = createSignal<Checkpoint[]>([])
  const [error, setError] = createSignal('')

  onMount(async () => {
    //get last checked number
    console.log('onmount')
    const result = await getLastCheckpoints(props.checkNum, 2)
    setLastCheck(result)
  })

  const handler = async () => {

    if (Number(num()) === 0) return;  //empty num() not valid

    const data: Checkpoint = {
      startingNumber: Number(num()),
      checkpointNumber: props.checkNum,
      time: new Date()
    }

    console.log('post payload:', data)

    const result = await addCheck(data)

    if (result.ok) {
      setNum('')    //clear input
      setError('')  //clear error
    }
    else {
      setError(result.error)
    }

    setLastCheck([data])

  }

  createEffect(() => {
    console.log('createEffect', lastCheck())
  })

  return (
    <div class="App">
      <h1>Checkpoint {props.checkNum}</h1>
      <LastCheckInfo check={lastCheck} />
      <ShowError err={error()} />
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
