import {readFile} from "fs/promises"


export default async function generateLocations() {
    const data = JSON.parse(await readFile("../layers/sample_locations.json"))
    console.log("AAAA")
    console.log(data)
}