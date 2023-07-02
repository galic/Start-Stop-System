import { Component } from "solid-js";
import { Header } from "./components/Header";

const MassStart: Component = () => {
    const buttonHandler = () => {
        console.log("click mass start");
    };
    return (
        <>
            <Header />
            <section class="ta-c">
                <div class="container">
                    <h1>Масс старт</h1>
                    <div class="flex beetween">
                        <label>Группа</label>
                        <select>
                            <option>Выберите группу</option>
                        </select>
                    </div>
                    <div>
                        <label>Время</label>
                        <input type="time" />
                    </div>
                    <button onclick={buttonHandler}>Старт</button>
                </div>
            </section>
        </>
    );
};

export default MassStart;
