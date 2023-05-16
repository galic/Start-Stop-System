
export async function getList() {
    const result = await (await fetch('https://my-json-server.typicode.com/galic/db/protocol')).json()
    console.log(result)

    //new result
    // const response = await fetch('http://start-stop-system.na4u.ru/api/checkpoints')
    // const data = await response.json()
    // console.log(data)

    return result
}

