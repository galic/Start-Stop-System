import { Component, For, createEffect, createSignal, onMount } from "solid-js"
import styles from './List.module.css';
import { timestampToTime } from "../common/timeutils";

type CheckPoint = {
  checkNum: number,
  time: number
}

type ListItem = {
  num: number;
  name: string,
  checkpoints: CheckPoint[]
}

// function timestampToTime(s: number): string {
//   const dtFormat = new Intl.DateTimeFormat('en-GB', {
//     timeStyle: 'medium',
//     timeZone: 'UTC'
//   });

//   return dtFormat.format(new Date(s));
// }

//вывод контрольных точек
const CheckPoint: Component<{ cp: CheckPoint }> = (props) => {
  //console.log('cp=', props.cp)
  if (props.cp === undefined) return <span></span>
  return <span>{timestampToTime(props.cp.time)}</span>
}

const List: Component = () => {
  const [list, setList] = createSignal<ListItem[]>([])

  onMount(async () => {
    //load list from server
    //...
    const result = await (await fetch('https://my-json-server.typicode.com/galic/db/protocol')).json()
    console.log(result)

    setList(result)
  })

  return (
    <>
      <h1>List</h1>
      <div class={styles.content}>
        <For each={list()} fallback={<div>loading...</div>}>
          {item =>
            <div class={styles.item}>
              <span>{item.num}</span>
              <span>{item.name}</span>
              <CheckPoint cp={item.checkpoints[0]} />
              <CheckPoint cp={item.checkpoints[1]} />
              <span>{(item.checkpoints.length > 1) ? timestampToTime(item.checkpoints[1].time - item.checkpoints[0].time) : null}</span>
            </div>}
        </For>
      </div>
    </>
  )
}

export default List