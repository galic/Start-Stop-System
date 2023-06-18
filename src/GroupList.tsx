import { Component, For, createSignal, onMount } from "solid-js";
import { Header } from "./components/Heaader";
//import { CheckPoint } from "./components/CheckPoint";
import { addGroup, delGroup, getGroups, GroupType } from "./common/api";

const GroupList: Component = () => {
    const [list, setList] = createSignal<GroupType[]>([]);
    const [groupName, setGroupName] = createSignal<string>("");

    onMount(async () => {
        console.log("onmount group list");
        const res = await getGroups();
        if (!res.error) {
            setList(res.result)
        }
    });

    const inputHandler = async (e: any) => {
        const text = e.target.value
        const result = await addGroup(text)
        if (!result.error) {
            const newListGroup = [...list(), result.result]
            setList(newListGroup)
            e.target.value = ''
        }

    }
    
    const deleteItemHandler = async (id: number) => {
        //console.log('delete group',id)
        const result = await delGroup(id)

        if(!result.error){
            //удаляем элемент из списка
            const newList=list().filter(group=>group.id!=id)
            setList(newList)
        }
    }

    return (
        <>
            <Header />
            <div class="container">
                <h1>Группы</h1>
                <For each={list()} fallback="загрузка...">
                    {(group) => <div class="flex row beetween mt-1">
                        {group.name}
                        <button onclick={() => deleteItemHandler(group.id)}>удалить</button>
                    </div>}
                </For>
                <div class="mt-1">
                    {/* <span>новая группа:</span> */}
                    <input onchange={(e) => inputHandler(e)} value={groupName()} />
                </div>
            </div>
        </>
    );
};

export default GroupList