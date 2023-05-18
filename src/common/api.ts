import { CheckPoint } from "../components/CheckPoint";

export type ProtocolItem = {
    startingNumber: number;
    name?: string;
    startDate: Date | null;
    stopDate: Date | null;
}

type ResultResponse = {
    startingNumber: number;
    startDate: string;
    stopDate: string;
}

export type Checkpoint = {
    id?: number,
    startingNumber: number,
    checkpointNumber: number,
    time: Date
}

export async function getList(): Promise<ProtocolItem[]> {

    //new result
    const response = await fetch('http://localhost:8000/api/checkpoints/protocol')
    const result: ResultResponse[] = await response.json()
    console.log(result)

    const data: ProtocolItem[] = []

    //convert
    result.forEach(r => {
        data.push({
            startingNumber: r.startingNumber,
            startDate: (r.startDate) ? new Date(r.startDate + 'Z') : null,    //lumen (API SSS) присылает дату в формате UTC без знака Z на конце, хотя дата приходет в зоне UTC
            stopDate: (r.stopDate) ? new Date(r.stopDate + 'Z') : null
        })
    })

    return data
}

export async function addCheck(checkpoint: Checkpoint): Promise<Checkpoint> {

    const result: Checkpoint = await api('http://localhost:8000/api/checkpoints', {
        method: 'post',
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(checkpoint),
    })

    console.log('addCheck from api', result)
    result.time = new Date(result.time + 'Z')
    console.log('addCheck result', result)

    return result
}

export async function getLastCheckpoints(checkpointNumber: number, limit: number = 1): Promise<Checkpoint[]> {
    const checkpoints: Checkpoint[] = await api(`http://localhost:8000/api/checkpoints?cn=${checkpointNumber}&limit=${limit}`)
    prepareDates(checkpoints)
    console.log('getLastCheckpoints', checkpoints)
    return checkpoints
}

//////////////////
// private funcs
///////////////////

async function api(url: string, options = {}) {
    const response = await fetch(url, options)
    return response.json()
}

function prepareDates(arr: Checkpoint[]) {

    arr.forEach(element=>{
        element.time= new Date(element.time + 'Z')  //correct lumen API
    })

}

