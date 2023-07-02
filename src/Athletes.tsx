import {
    Component,
    For,
    createEffect,
    createResource,
    createSignal,
    onMount,
} from "solid-js";
import { Header } from "./components/Header";
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
    const [groupId, setGroupId] = createSignal<string>("");
    const [groups, setGroups] = createSignal<GroupType[]>([]);

    onMount(async () => {
        console.log("onmount athlete list");
        const res = await getAthletes();
        if (!res.error) {
            setList(res.result);
        }

        const groups = await getGroups();
        console.log(groups.result);
        setGroups(groups.result);
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
            Number(startingNumber()),
            Number(groupId())
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
                            <span
                                class="i-block pr-1"
                                style={{ width: "25px", "text-align": "right" }}
                            >
                                {athlete.startingNumber}
                            </span>
                            <span class="flex-1">{athlete.name}</span>
                            <span class="flex-1">{athlete.group?.name}</span>
                            <button
                                class="ml-1"
                                onclick={() => deleteItemHandler(athlete.id)}
                            >
                                удалить
                            </button>
                        </div>
                    )}
                </For>
                <div class="mt-1" style={{"background-color":"#ccc","padding":"1em"}}>
                    <h6>Добавить участника</h6>
                    <div class="flex mt-1">
                        <label class="flex-1" for="statring-number">Номер</label>
                        <input
                            id="starting-number"
                            oninput={(e) => setStartingNumber(e.target.value)}
                            value={startingNumber()}
                        />
                    </div>
                    <div class="flex mt-1">
                        <label class="flex-1" for="name">Имя</label>
                        <input
                            id="name"
                            oninput={(e) => setAthleteName(e.target.value)}
                            value={athleteName()}
                        />
                    </div>
                    <div class="flex mt-1">
                        <label class="flex-1" for="group">Группа</label>
                        <select class="flex-1" onchange={(e) => setGroupId(e.target.value)} id="group">
                            <option>Выберите группу</option>
                            <For each={groups()}>
                                {(item, index) => (
                                    <option value={item.id}>{item.name}</option>
                                )}
                            </For>
                        </select>
                    </div>
                    <button onclick={newAthleteHandler}>добавить</button>
                </div>
            </div>
        </>
    );
};

export default Atheles;
