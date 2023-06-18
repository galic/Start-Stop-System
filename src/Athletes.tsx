import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import { Header } from "./components/Heaader";
import {
    AtheleType,
    GroupType,
    addAthlete,
    delAthlete,
    getAthletes,
    getGroups,
} from "./common/api";

const Atheles: Component = () => {
    const [list, setList] = createSignal<AtheleType[]>([]);
    const [athleteName, setAthleteName] = createSignal<string>("");
    const [startingNumber, setStartingNumber] = createSignal<string>("");

    onMount(async () => {
        console.log("onmount athlete list");
        const res = await getAthletes();
        if (!res.error) {
            setList(res.result);
        }
    });

    const deleteItemHandler = async (id: number) => {
        //console.log('delete group',id)
        const result = await delAthlete(id);

        if (!result.error) {
            //удаляем элемент из списка
            const newList = list().filter((group) => group.id != id);
            setList(newList);
        }
    };

    const newAthleteHandler = async () => {
        const result = await addAthlete(
            athleteName(),
            Number(startingNumber())
        );

        if (!result.error) {
            const newList = [...list(), result.result];
            setList(newList);
            setAthleteName("");
            setStartingNumber("");
        }
    };

    return (
        <>
            <Header />
            <div class="container">
                <h1>Участники</h1>
                <For each={list()} fallback="загрузка...">
                    {(athlete) => (
                        <div class="flex row beetween mt-1">
                            <span>{athlete.startingNumber}</span>
                            <span>{athlete.name}</span>
                            <button
                                onclick={() => deleteItemHandler(athlete.id)}
                            >
                                удалить
                            </button>
                        </div>
                    )}
                </For>
                <div class="mt-1">
                    <input
                        oninput={(e) => setAthleteName(e.target.value)}
                        value={athleteName()}
                    />
                    <input
                        oninput={(e) => setStartingNumber(e.target.value)}
                        value={startingNumber()}
                    />
                    <select>
                        {/* <For each={}></For> */}
                    </select>
                    <button onclick={newAthleteHandler}>добавить</button>
                </div>
            </div>
        </>
    );
};

export default Atheles;
