import { Component, For, createSignal, onMount } from "solid-js"
import styles from './List.module.css';
import { formatTime, formatUTCTime } from "../common/timeutils";
import { ProtocolItem, getList } from "../common/api";

const List: Component = () => {
  const [list, setList] = createSignal<ProtocolItem[]>([])

  onMount(async () => {

    //load list from server
    const result = await getList()

    console.log(result)

    let data: ProtocolItem[] = []
    result.forEach(e => {
      const item: ProtocolItem = {
        startingNumber: e.startingNumber,
        name: e.name,
        startDate: e.startDate,
        stopDate: e.stopDate,
      }
      data.push(item)
    })

    setList(data)
  })
  // вывод разницы между двумя датами в формате чч:мм:сс
  const result = (start: Date | null, stop: Date | null) => {
    if (start && stop) {
      return formatUTCTime(stop.getTime() - start.getTime())
    }
    return ''
  }

  return (
    <>
      <h1>Список</h1>
      <div class={styles.content}>
        <For each={list()} fallback={<div>загрузка...</div>}>
          {item =>
            <div class={styles.item}>
              <span>{item.startingNumber}</span>
              <span>{item.name}</span>
              <span>{(item.startDate) ? formatTime(item.startDate.getTime()) : ''}</span>
              <span>{(item.stopDate) ? formatTime(item.stopDate.getTime()) : ''}</span>
              <span>{result(item.startDate, item.stopDate)}</span>
            </div>}
        </For>
      </div>
    </>
  )
}

export default List