import { Accessor, Component, For, createEffect, createSignal, onMount } from "solid-js";
import styles from './CheckPoint.module.css'
import { formatTime } from "../common/timeutils";
import { Checkpoint, addCheck, delCheck, getLastCheckpoints } from "../common/api";

const LastCheckInfo: Component<{ check: Accessor<Checkpoint[]>, deleteHandler: (id: number) => Promise<void> }> = (props) => {

  return (
    <div class={styles.LastCheckContainer}>
      <h6>{(props.check().length === 0) ? 'нет информации' : 'последние отмеченные'}</h6>
      <For each={props.check()}>{(checkpoint, index) =>
        <div class={styles.LastCheck}>
          <span class={styles.StartingNumber}>{checkpoint.startingNumber}</span>
          {' '}
          <span>{formatTime(checkpoint.time.getTime())}</span>
          {' '}
          <button class={styles.RemoveBtn} onclick={() => props.deleteHandler(checkpoint.id!)}>удалить</button>
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

export const CheckPoint: Component<{ checkNum: number, title: string }> = (props) => {
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

    const result = await addCheck({
      startingNumber: Number(num()),
      checkpointNumber: props.checkNum,
      time: new Date()
    })

    if (result.result) {
      setNum('')    //clear input
      setError('')  //clear error
    }
    else if (result.error) {
      setError(result.error)
    }

    setLastCheck(await getLastCheckpoints(props.checkNum, 2))

  }

  const removeCheckpointHandler = async (checkPointId: number) => {
    console.log('remove checkpoint handler', checkPointId)

    const res = await delCheck(checkPointId)

    if(!res.error){
      const result = await getLastCheckpoints(props.checkNum, 2)
      setLastCheck(result)
    }

  }


  createEffect(() => {
    console.log('createEffect', lastCheck())
  })

  return (
    <div class="App">
      <h1>{(props.title) ? props.title : 'Checkpoint ' + props.checkNum}</h1>
      <LastCheckInfo check={lastCheck} deleteHandler={removeCheckpointHandler} />
      <ShowError err={error()} />
      <div class={styles.FormWrapper}>
        <input
          class={styles.Input}
          type="number"
          value={num()}
          oninput={(e) => setNum(e.target.value)}
        />
        <button class={styles.Button} onclick={() => handler()}>{props.title}</button>
      </div>
    </div>
  );
};
