import { readFile, writeFile } from "fs/promises"
import { Buffer } from "buffer"
import { buffer } from "@turf/buffer";
import { dissolve } from "@turf/dissolve";

export default async function generateBuffer() {
    const data = JSON.parse(await readFile("../layers/strike_locations_generated.geojson"))

    const picketed_locations = {
        ...data,
        features: data.features.filter(f => f.properties.is_picket_line)        
    }
    const buffered_locations = buffer(picketed_locations, 30, {units: "kilometres"})
    const dissolved_buffers = dissolve(buffered_locations)
    
    console.log(dissolved_buffers)
    
    const fileContent = new Uint8Array(Buffer.from(JSON.stringify(dissolved_buffers, null, 2)))
    await writeFile("../layers/strike_locations_30k_generated.geojson", fileContent)
}
